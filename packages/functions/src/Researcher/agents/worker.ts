import OpenAI from "openai";
import { Task, TaskResult } from '../shared/taskTypes';

export class WorkerAgent {
    id: string;
    isBusy: boolean = false;
    private openai: OpenAI;

    constructor(id: string, apiKey: string) {
        this.id = id;
        this.openai = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "X-Title": "GainsGladiators",
            }
        });
    }

    async executeTask(task: Task): Promise<TaskResult> {
        this.isBusy = true;
        try {
            // Implement task execution logic here
            // This is a placeholder implementation
            const result = await this.openai.chat.completions.create({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: task.description }],
            });

            return {
                id: task.id,
                workerId: this.id,
                status: 'success',
                result: result.choices[0].message.content
            };
        } catch (error) {
            return {
                id: task.id,
                workerId: this.id,
                status: 'error',
                error: error.message
            };
        } finally {
            this.isBusy = false;
        }
    }
}
