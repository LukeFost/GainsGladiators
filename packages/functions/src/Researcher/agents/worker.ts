import { Task, TaskResult } from '../shared/taskTypes';
import { exaSearch } from '../tools/searcher';
import { OpenAI } from 'openai';

export class WorkerAgent {
  id: string;
  isBusy: boolean = false;
  

  constructor(id: string) {
    this.id = id;
  }

  async executeTask(task: Task): Promise<TaskResult> {
    console.log(`Worker ${this.id} starting task ${task.id}`);
    this.isBusy = true;
    try {
      const result = await this.performTask(task);
      console.log(`Worker ${this.id} completed task ${task.id} successfully`);
      return {
        id: task.id,
        workerId: this.id,
        status: 'success',
        result: result
      };
    } catch (error) {
      console.error(`Worker ${this.id} failed to execute task ${task.id}:`, error);
      return {
        id: task.id,
        workerId: this.id,
        status: 'error',
        error: `Worker ${this.id} failed to execute task ${task.id}: ${error instanceof Error ? error.message : String(error)}`
      };
    } finally {
      this.isBusy = false;
    }
  }

  private async performTask(task: Task): Promise<string> {
    
    const queryJson = JSON.parse(task.description);
    const formattedQuery = queryJson.formattedQuery || queryJson.originalQuery;
    const searchResult = await exaSearch(formattedQuery, task.parameters);
    
    // Generate a response based on the search results and the formatted query
    const response = {
      originalQuery: queryJson.originalQuery,
      formattedQuery: formattedQuery,
      keywords: queryJson.keywords,
      context: queryJson.context,
      searchResults: searchResult,
      // Here you would typically use an AI to generate a summary or analysis
      summary: `Search completed for "${formattedQuery}". ${searchResult.length} results found.`
    };

    console.log(JSON.stringify(response))

    return JSON.stringify(response);
  }
}