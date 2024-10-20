import { WorkerAgent } from './worker';
import { Task, TaskResult } from '../shared/taskTypes';

export class WorkerPool {
    private workers: WorkerAgent[];

    constructor(numWorkers: number) {
        this.workers = Array.from({ length: numWorkers }, (_, i) => new WorkerAgent(`worker-${i + 1}`));
    }

    async executeTasks(tasks: Task[]): Promise<TaskResult[]> {
        const promises = this.workers.map((worker, index) => {
            if (index < tasks.length) {
                return worker.executeTask(tasks[index]);
            }
            return Promise.resolve(null);
        });

        const results = await Promise.all(promises);
        return results.filter((result): result is TaskResult => result !== null);
    }
}
