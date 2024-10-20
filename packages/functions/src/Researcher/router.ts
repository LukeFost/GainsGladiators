import { WorkerPool } from './agents/workerPool';
import { Task, TaskResult } from './shared/taskTypes';
import { processQueryWithLLM } from './shared/llm';
import { queryFormatterPrompt } from './prompts/queryFormatter';

export class Router {
    private workerPool: WorkerPool;

    constructor(numWorkers: number = 3) {
        this.workerPool = new WorkerPool(numWorkers);
    }

    async handleQuery(query: string): Promise<{ results: TaskResult[], truncated: boolean }> {
        console.log('Router: Starting to handle query:', query);
        
        // Process the query through LLM
        const formattedQuery = await processQueryWithLLM(
            query,
            queryFormatterPrompt.model,
            queryFormatterPrompt.system,
            queryFormatterPrompt.user(query)
        );
        console.log('Router: Formatted query:', formattedQuery);

        const workerCount = this.workerPool.getWorkerCount();
        const tasks: Task[] = Array.from({ length: workerCount }, (_, i) => ({
            id: `task-${Date.now()}-${i}`,
            description: formattedQuery,
            parameters: {
                maxResults: 5,
                yearRange: '2023-2024'
            }
        }));

        try {
            const results = await this.workerPool.executeTasks(tasks);
            console.log('Router: All tasks completed');
            
            // Limit the response size
            const maxResponseSize = 30000; // Adjust this value as needed
            let responseString = JSON.stringify({ results });
            let truncated = false;

            if (responseString.length > maxResponseSize) {
                const truncatedResults = [];
                let currentSize = 0;
                for (const result of results) {
                    const resultString = JSON.stringify(result);
                    if (currentSize + resultString.length > maxResponseSize) {
                        truncated = true;
                        break;
                    }
                    truncatedResults.push(result);
                    currentSize += resultString.length;
                }
                return { results: truncatedResults, truncated };
            }

            return { results, truncated };
        } catch (error) {
            console.error('Router: Error handling query:', error);
            throw error;
        }
    }
}
