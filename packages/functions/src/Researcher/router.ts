import { WorkerPool } from './agents/workerPool';
import { Task, TaskResult } from './shared/taskTypes';

export class Router {
    private workerPool: WorkerPool;

    constructor(numWorkers: number = 1) {
        this.workerPool = new WorkerPool(numWorkers);
    }

    async handleQuery(query: string): Promise<{ results: TaskResult[], truncated: boolean }> {
        console.log('Router: Starting to handle query:', query);
        const workerCount = this.workerPool.getWorkerCount();
        const tasks: Task[] = Array.from({ length: workerCount }, (_, i) => ({
            id: `task-${Date.now()}-${i}`,
            description: query,
            parameters: {
                maxResults: 5,
                yearRange: '2020-2023'
            }
        }));

        try {
            const results = await this.workerPool.executeTasks(tasks);
            console.log('Router: All tasks completed');
            
            // Limit the response size
            const maxResponseSize = 5000; // Adjust this value as needed
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
