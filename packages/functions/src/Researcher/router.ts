import { WorkerAgent } from './agents/worker';
import { Task, TaskResult } from './shared/taskTypes';

export class Router {
    private worker: WorkerAgent;

    constructor() {
        this.worker = new WorkerAgent('worker-1');
    }

    async handleQuery(query: string): Promise<TaskResult> {
        console.log('Router: Starting to handle query:', query);
        const task: Task = {
            id: 'task-1',
            description: JSON.stringify(query),
            parameters: {
                // Add any default search parameters here
                maxResults: 5,
                yearRange: '2020-2023'
            }
        };

        try {
            const result = await this.worker.executeTask(task);
            console.log('Router: Task completed');
            return result;
        } catch (error) {
            console.error('Router: Error handling query:', error);
            throw error;
        }
    }
}
