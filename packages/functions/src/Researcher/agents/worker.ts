import { Task, TaskResult } from '../shared/taskTypes';
import OpenAI from 'openai';
import { getAvailableTools } from '../tools/toolDefinitions';

export class WorkerAgent {
    id: string;
    isBusy: boolean = false;
    private openai: OpenAI;

    constructor(id: string, openai: OpenAI) {
        this.id = id;
        this.openai = openai;
    }

    /**
     * Executes a given task.
     * @param task - The task to execute.
     * @returns The result of the task execution.
     */
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
            console.log(`Worker ${this.id} is now available`);
        }
    }

    /**
     * Performs the actual task processing using AI.
     * @param task - The task to perform.
     * @returns The result of the task.
     */
    private async performTask(task: Task): Promise<string> {
        const prompt = `
        Execute the following task:
        ${task.description}

        Parameters:
        ${JSON.stringify(task.parameters, null, 2)}

        Provide a detailed response addressing all aspects of the task.
        `;

        const messages = [
            { role: 'user', content: prompt }
        ];

        const completion = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            functions: getAvailableTools(),
            function_call: 'auto'
        });

        const responseMessage = completion.choices[0].message;

        if (responseMessage.content) {
            return responseMessage.content;
        } else if (responseMessage.function_call) {
            // Handle function calls if needed
            return 'Function call was made, but handling is not implemented yet.';
        } else {
            throw new Error('Failed to generate response for the task');
        }
    }
}
