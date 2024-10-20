import { Task, TaskResult } from '../shared/taskTypes';
import { exaSearch } from '../tools/searcher';

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
        const query = JSON.parse(task.description);
        const searchResult = await exaSearch(query, task.parameters);
        
        // Here you would typically use an AI to generate a response based on the search results
        // For simplicity, we'll just return the search results
        return `Search results for "${query}": ${searchResult}`;
    }
}
