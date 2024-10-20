import { WorkerPool } from './agents/workerPool';
import { Task, TaskResult } from './shared/taskTypes';

export class Router {
    private workerPool: WorkerPool;

    constructor(numWorkers: number = 1) {
        this.workerPool = new WorkerPool(numWorkers);
    }

    async handleQuery(query: string): Promise<TaskResult[]> {
        console.log('Router: Starting to handle query:', query);
        const tasks: Task[] = Array.from({ length: this.workerPool.workers.length }, (_, i) => ({
            id: `task-${Date.now()}-${i}`,
            description: JSON.stringify(query),
            parameters: {
                maxResults: 5,
                yearRange: '2020-2023'
            }
        }));

        try {
            const results = await this.workerPool.executeTasks(tasks);
            console.log('Router: All tasks completed');
            return results;
        } catch (error) {
            console.error('Router: Error handling query:', error);
            throw error;
        }
    }
}
