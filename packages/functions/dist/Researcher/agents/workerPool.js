import { WorkerAgent } from './worker';
export class WorkerPool {
    workers;
    constructor(numWorkers) {
        this.workers = Array.from({ length: numWorkers }, (_, i) => new WorkerAgent(`worker-${i + 1}`));
        console.log(`WorkerPool: Initialized with ${numWorkers} workers`);
    }
    getWorkerCount() {
        return this.workers.length;
    }
    async executeTasks(tasks) {
        console.log(`WorkerPool: Executing ${tasks.length} tasks`);
        const promises = this.workers.map((worker, index) => {
            if (index < tasks.length) {
                console.log(`WorkerPool: Assigning task ${tasks[index].id} to ${worker.id}`);
                return worker.executeTask(tasks[index]);
            }
            console.log(`WorkerPool: No task for ${worker.id}`);
            return Promise.resolve(null);
        });
        const results = await Promise.all(promises);
        const filteredResults = results.filter((result) => result !== null);
        console.log(`WorkerPool: Completed ${filteredResults.length} tasks`);
        return filteredResults;
    }
}
