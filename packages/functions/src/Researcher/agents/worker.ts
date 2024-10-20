import { Task, TaskResult } from '../shared/taskTypes';
import { exaSearch } from '../tools/searcher';
import { getTrendingPools } from '../tools/coingecko';
import { getTrendingPoolsForNetwork } from '../tools/flowgecko';
import { processQueryWithLLM } from '../shared/llm';
import { analysisPrompt } from '../prompts/analysisPrompt';
import { getProtocolData, getProtocolFees } from '../tools/defiLlama';

export class WorkerAgent {
  id: string;
  isBusy: boolean = false;

  constructor(id: string) {
    this.id = id;
    console.log(`WorkerAgent: ${this.id} initialized`);
  }

  async executeTask(task: Task): Promise<TaskResult> {
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
    } catch (error) {
      console.error(`WorkerAgent: ${this.id} failed to execute task ${task.id}:`, error);
      return {
        id: task.id,
        workerId: this.id,
        status: 'error',
        error: `WorkerAgent: ${this.id} failed to execute task ${task.id}: ${error instanceof Error ? error.message : String(error)}`
      };
    } finally {
      this.isBusy = false;
    }
  }

  private async performTask(task: Task): Promise<string> {
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
    const analysis = await processQueryWithLLM(
      enhancedQuery,
      analysisPrompt.model,
      analysisPrompt.system,
      analysisPrompt.user(queryJson.originalQuery, enhancedQuery, searchResult)
    );

    // Extract protocols from the search results
    const searchResultJson = JSON.parse(searchResult);
    const protocols = this.extractProtocols(searchResultJson);

    // Fetch additional data for each protocol
    const protocolData = await this.fetchProtocolData(protocols);

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
      protocolData: protocolData
    };

    console.log(`WorkerAgent: ${this.id} completed analysis for task ${task.id}`);

    return JSON.stringify(response);
  }

  private extractProtocols(searchResults: any): string[] {
    // Implement logic to extract protocol names from search results
    // This is a placeholder implementation and should be adjusted based on the actual structure of your search results
    const protocols: Set<string> = new Set();
    if (Array.isArray(searchResults)) {
      searchResults.forEach(result => {
        if (result.protocol) {
          protocols.add(result.protocol.toLowerCase());
        }
      });
    }
    return Array.from(protocols);
  }

  private async fetchProtocolData(protocols: string[]): Promise<any> {
    const protocolData: any = {};
    for (const protocol of protocols) {
      const data = await getProtocolData(protocol);
      const fees = await getProtocolFees(protocol);
      if (data || fees) {
        protocolData[protocol] = { data, fees };
      }
    }
    return protocolData;
  }
}
