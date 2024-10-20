import { Task, TaskResult } from '../shared/taskTypes';
import OpenAI from 'openai';

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
                "HTTP-Referer": "https://gainsgladiators.com",
                "X-Title": "GainsGladiators",
            }
        });
    }

    /**
     * Executes a given task.
     * @param task - The task to execute.
     * @returns The result of the task execution.
     */
    async executeTask(task: Task): Promise<TaskResult> {
        this.isBusy = true;
        try {
            const result = await this.performTask(task);
            return {
                id: task.id,
                workerId: this.id,
                status: 'success',
                result: result
            };
        } catch (error) {
            return {
                id: task.id,
                workerId: this.id,
                status: 'error',
                error: `Worker ${this.id} failed to execute task ${task.id}: ${error.message}`
            };
        } finally {
            this.isBusy = false;
        }
    }

    /**
     * Performs the actual task processing using AI.
     * @param task - The task to perform.
     * @returns The result of the task.
     */
    private async performTask(task: Task): Promise<any> {
        const prompt = `
        Execute the following task:
        ${task.description}

        Parameters:
        ${JSON.stringify(task.parameters, null, 2)}

        Provide a detailed response addressing all aspects of the task.
        `;

        const completion = await this.openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error("Failed to generate response for the task");
        }

        return content;
    }
}
