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
        console.log('Router: Starting to handle query:', query);
        try {
            const tasks: Task[] = await this.optimizer.optimizeQuery(query);
            console.log('Router: Tasks optimized:', JSON.stringify(tasks, null, 2));
            const taskPromises = tasks.map(task => this.assignTaskToWorker(task));
            this.taskResults = await Promise.all(taskPromises);
            console.log('Router: All tasks completed');
            console.log('Router: Task results:', JSON.stringify(this.taskResults, null, 2));
            return this.taskResults;
        } catch (error) {
            console.error('Router: Error handling query:', error);
            throw error;
        }
    }

    private async assignTaskToWorker(task: Task): Promise<TaskResult> {
        console.log(`Router: Attempting to assign task ${task.id}`);
        let attempts = 0;
        const maxAttempts = 5;
        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        while (attempts < maxAttempts) {
            const worker = this.getAvailableWorker();
            if (worker) {
                console.log(`Router: Assigning task ${task.id} to worker ${worker.id}`);
                return await worker.executeTask(task);
            }
            console.log(`Router: No available worker, attempt ${attempts + 1}/${maxAttempts}`);
            await delay(500);
            attempts++;
        }

        console.error(`Router: Failed to assign task ${task.id} after ${maxAttempts} attempts`);
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
