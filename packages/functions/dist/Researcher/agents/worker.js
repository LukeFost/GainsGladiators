import { exaSearch } from '../tools/searcher';
import { getTrendingPools } from '../tools/coingecko';
import { getTrendingPoolsForNetwork } from '../tools/flowgecko';
import { processQueryWithLLM } from '../shared/llm';
import { analysisPrompt } from '../prompts/analysisPrompt';
import { getProtocolData, getProtocolFees, findProtocol } from '../tools/defiLlama';
import fuzzysort from 'fuzzysort';
export class WorkerAgent {
    id;
    isBusy = false;
    constructor(id) {
        this.id = id;
        console.log(`WorkerAgent: ${this.id} initialized`);
    }
    async executeTask(task) {
        console.log(`WorkerAgent: ${this.id} starting task ${task.id}`);
        this.isBusy = true;
        try {
            const result = await this.performTask(task);
            console.log(`WorkerAgent: ${this.id} completed task ${task.id} successfully`);
            return {
                id: task.id,
                workerId: this.id,
                status: 'success',
                result: result
            };
        }
        catch (error) {
            console.error(`WorkerAgent: ${this.id} failed to execute task ${task.id}:`, error);
            return {
                id: task.id,
                workerId: this.id,
                status: 'error',
                error: `WorkerAgent: ${this.id} failed to execute task ${task.id}: ${error instanceof Error ? error.message : String(error)}`
            };
        }
        finally {
            this.isBusy = false;
        }
    }
    async performTask(task) {
        console.log(`WorkerAgent: ${this.id} performing task ${task.id}`);
        const queryJson = JSON.parse(task.description);
        const formattedQuery = queryJson.formattedQuery || queryJson.originalQuery;
        console.log(`WorkerAgent: ${this.id} fetching trending pools for task ${task.id}`);
        const trendingPools = await getTrendingPools();
        const trendingPoolsQuery = trendingPools.join(', ');
        console.log(`WorkerAgent: ${this.id} fetching trending pools for Ethereum network for task ${task.id}`);
        const trendingPoolsEthereum = await getTrendingPoolsForNetwork('eth');
        const trendingPoolsEthereumQuery = trendingPoolsEthereum.join(', ');
        const enhancedQuery = `${formattedQuery} focusing on these trending tokens across all networks: ${trendingPoolsQuery}, and these trending tokens on Ethereum: ${trendingPoolsEthereumQuery}`;
        console.log(`WorkerAgent: ${this.id} executing exaSearch with enhanced query for task ${task.id}`);
        const searchResult = await exaSearch(enhancedQuery, task.parameters);
        console.log(`WorkerAgent: ${this.id} generating analysis for task ${task.id}`);
        const analysis = await processQueryWithLLM(enhancedQuery, analysisPrompt.model, analysisPrompt.system, analysisPrompt.user(queryJson.originalQuery, enhancedQuery, searchResult));
        // Extract protocols from the search results
        const searchResultJson = JSON.parse(searchResult);
        const protocols = this.extractProtocols(searchResultJson);
        // Extract protocols from LLM analysis
        const llmProtocols = this.extractLLMProtocols(JSON.parse(analysis));
        // Combine and deduplicate protocols
        const allProtocols = [...new Set([...protocols, ...llmProtocols.identified, ...llmProtocols.interested])];
        // Fetch additional data for each protocol
        const protocolData = await this.fetchProtocolData(allProtocols);
        const response = {
            originalQuery: queryJson.originalQuery,
            formattedQuery: formattedQuery,
            enhancedQuery: enhancedQuery,
            trendingPoolsAllNetworks: trendingPools,
            trendingPoolsEthereum: trendingPoolsEthereum,
            keywords: queryJson.keywords,
            context: queryJson.context,
            searchResults: searchResultJson,
            analysis: JSON.parse(analysis),
            extractedProtocols: protocols,
            llmIdentifiedProtocols: llmProtocols.identified,
            llmInterestedProtocols: llmProtocols.interested,
            protocolData: protocolData
        };
        console.log(`WorkerAgent: ${this.id} completed analysis for task ${task.id}`);
        return JSON.stringify(response);
    }
    extractProtocols(searchResults) {
        const protocols = new Set();
        const protocolRegex = /(?:^|\s)([A-Z][a-z]+(?:[A-Z][a-z]+)*(?:\.(?:finance|io|org|com))?)\b/g;
        const protocolKeywords = ['protocol', 'dapp', 'platform', 'exchange', 'dex'];
        if (Array.isArray(searchResults)) {
            searchResults.forEach(result => {
                // Direct extraction
                if (result.protocol) {
                    protocols.add(result.protocol.toLowerCase());
                }
                // Regex matching
                const content = JSON.stringify(result);
                let match;
                while ((match = protocolRegex.exec(content)) !== null) {
                    protocols.add(match[1].toLowerCase());
                }
                // Keyword-based extraction
                protocolKeywords.forEach(keyword => {
                    const regex = new RegExp(`${keyword}\\s+([A-Z][a-z]+(?:[A-Z][a-z]+)*)`);
                    const keywordMatch = content.match(regex);
                    if (keywordMatch) {
                        protocols.add(keywordMatch[1].toLowerCase());
                    }
                });
            });
        }
        return Array.from(protocols);
    }
    extractLLMProtocols(analysis) {
        const identified = new Set();
        const interested = new Set();
        if (Array.isArray(analysis.identifiedProtocols)) {
            analysis.identifiedProtocols.forEach((protocol) => identified.add(protocol.toLowerCase()));
        }
        if (Array.isArray(analysis.interestedProtocols)) {
            analysis.interestedProtocols.forEach((protocol) => interested.add(protocol.toLowerCase()));
        }
        return {
            identified: Array.from(identified),
            interested: Array.from(interested)
        };
    }
    async fetchProtocolData(protocols) {
        const protocolData = {};
        const matchedProtocolsMap = await this.fuzzyFindProtocols(protocols);
        for (const [protocol, matchedProtocols] of matchedProtocolsMap.entries()) {
            for (const matchedProtocol of matchedProtocols) {
                const data = await getProtocolData(matchedProtocol);
                const fees = await getProtocolFees(matchedProtocol);
                if (data || fees) {
                    protocolData[matchedProtocol] = { data, fees };
                }
            }
            if (matchedProtocols.length === 0) {
                console.log(`No matching protocol found for: ${protocol}`);
            }
        }
        return protocolData;
    }
    async fuzzyFindProtocols(protocolNames) {
        const allProtocols = await findProtocol('');
        if (!Array.isArray(allProtocols) || allProtocols.length === 0) {
            console.log('No protocols found or invalid response from findProtocol');
            return new Map();
        }
        const preparedTargets = allProtocols.map(p => ({ name: p, prepared: fuzzysort.prepare(p) }));
        const matchedProtocols = new Map();
        for (const protocolName of protocolNames) {
            const results = fuzzysort.go(protocolName, preparedTargets, {
                key: 'prepared',
                threshold: -10000,
                limit: 10 // Get top 10 matches
            });
            const matches = results
                .filter(result => result.score > -1000) // Adjust this threshold as needed
                .map(result => result.obj.name);
            matchedProtocols.set(protocolName, matches);
        }
        return matchedProtocols;
    }
}
