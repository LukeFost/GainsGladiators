import { Task, TaskResult } from '../shared/taskTypes';
import { exaSearch } from '../tools/searcher';
import { getTrendingPools } from '../tools/coingecko';
import { processQueryWithLLM } from '../shared/llm';
import { analysisPrompt } from '../prompts/analysisPrompt';

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

    const enhancedQuery = `${formattedQuery} focusing on these trending tokens: ${trendingPoolsQuery}`;
    console.log(`WorkerAgent: ${this.id} executing exaSearch with enhanced query for task ${task.id}`);
    const searchResult = await exaSearch(enhancedQuery, task.parameters);
    
    console.log(`WorkerAgent: ${this.id} generating analysis for task ${task.id}`);
    const analysis = await processQueryWithLLM(
      enhancedQuery,
      analysisPrompt.model,
      analysisPrompt.system,
      analysisPrompt.user(queryJson.originalQuery, enhancedQuery, searchResult)
    );
    
    const response = {
      originalQuery: queryJson.originalQuery,
      formattedQuery: formattedQuery,
      enhancedQuery: enhancedQuery,
      trendingPools: trendingPools,
      keywords: queryJson.keywords,
      context: queryJson.context,
      searchResults: JSON.parse(searchResult),
      analysis: JSON.parse(analysis)
    };

    console.log(`WorkerAgent: ${this.id} completed analysis for task ${task.id}`);

    return JSON.stringify(response);
  }
}
