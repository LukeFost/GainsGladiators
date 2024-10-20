import OpenAI from "openai";
import { QueryOptimizer } from './agents/optimizer';
import { WorkerAgent } from './agents/worker';
import { Task, TaskResult } from './shared/taskTypes';

export class Router {
    private optimizer: QueryOptimizer;
    private workers: WorkerAgent[] = [];
    private taskResults: TaskResult[] = [];

    constructor(optimizer: QueryOptimizer, workerCount: number, openai: OpenAI) {
        this.optimizer = optimizer;
        for (let i = 0; i < workerCount; i++) {
            this.workers.push(new WorkerAgent(`worker-${i + 1}`, openai));
        }
    }

    async handleQuery(query: string): Promise<TaskResult[]> {
        try {
            const tasks: Task[] = await this.optimizer.optimizeQuery(query);
            const taskPromises = tasks.map(task => this.assignTaskToWorker(task));
            this.taskResults = await Promise.all(taskPromises);
            return this.taskResults;
        } catch (error) {
            console.error('Error handling query:', error);
            throw error;
        }
    }

    private async assignTaskToWorker(task: Task): Promise<TaskResult> {
        let attempts = 0;
        const maxAttempts = 5;
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        while (attempts < maxAttempts) {
            const worker = this.getAvailableWorker();
            if (worker) {
                return await worker.executeTask(task);
            }
            await delay(500);
            attempts++;
        }

        return {
            id: task.id,
            workerId: 'N/A',
            status: 'error',
            error: 'No available workers after multiple attempts'
        };
    }

    private getAvailableWorker(): WorkerAgent | null {
        return this.workers.find(worker => !worker.isBusy) || null;
    }
}
