import { Task, TaskResult } from '../shared/taskTypes';
import OpenAI, { ChatCompletionCreateParams } from 'openai';
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
        this.isBusy = true;
        try {
            const result = await this.performTask(task);
            return {
                id: task.id,
                workerId: this.id,
                status: 'success',
                result: result,
            };
        } catch (error) {
            return {
                id: task.id,
                workerId: this.id,
                status: 'error',
                error: `Worker ${this.id} failed to execute task ${task.id}: ${
                    error instanceof Error ? error.message : String(error)
                }`,
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
    private async performTask(task: Task): Promise<string> {
        console.log(`Worker ${this.id}: Starting task ${task.id}`);
        const prompt = `
        Execute the following task:
        ${task.description}

        Parameters:
        ${JSON.stringify(task.parameters, null, 2)}

        Provide a detailed response addressing all aspects of the task.
        `;

        const messages: ChatCompletionCreateParams.Message[] = [
            { role: 'user', content: prompt },
        ];

        try {
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
                functions: getAvailableTools(),
                function_call: 'auto',
            });

            console.log(`Worker ${this.id}: Raw OpenAI response:`, JSON.stringify(completion, null, 2));

            if (!completion.choices || completion.choices.length === 0) {
                throw new Error('No choices returned from OpenAI API');
            }

            const responseMessage = completion.choices[0].message;

            if (responseMessage.content) {
                console.log(`Worker ${this.id}: Task ${task.id} completed successfully`);
                return responseMessage.content;
            } else if (responseMessage.function_call) {
                console.log(`Worker ${this.id}: Function call made for task ${task.id}:`, JSON.stringify(responseMessage.function_call, null, 2));
                return `Function call was made: ${JSON.stringify(responseMessage.function_call)}`;
            } else {
                throw new Error('Unexpected response format from OpenAI API');
            }
        } catch (error) {
            console.error(`Worker ${this.id}: Error in performTask for task ${task.id}:`, error);
            if (error instanceof Error) {
                console.error(`Worker ${this.id}: Error stack:`, error.stack);
            }
            throw new Error(`Failed to execute task: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
