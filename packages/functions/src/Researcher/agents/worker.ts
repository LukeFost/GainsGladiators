import OpenAI from "openai";
import { Task, TaskResult } from '../shared/taskTypes';
import { executeTools } from '../tools/toolExecutor';
import { getAvailableTools } from '../tools/toolDefinitions';

export class WorkerAgent {
    id: string;
    isBusy: boolean = false;
    private openai: OpenAI;

    constructor(id: string, openai: OpenAI) {
        this.id = id;
        this.openai = openai;
    }

    async executeTask(task: Task): Promise<TaskResult> {
        this.isBusy = true;
        try {
            const result = await this.performTaskWithTools(task);

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
                error: error.message
            };
        } finally {
            this.isBusy = false;
        }
    }

    private async performTaskWithTools(task: Task): Promise<string> {
        let conversationMessages = [
            { role: "system", content: "You are a research assistant. Use the provided tools to complete the task." },
            { role: "user", content: `Task: ${task.description}\nParameters: ${JSON.stringify(task.parameters)}` }
        ];

        let toolCallRequired = true;

        while (toolCallRequired) {
            const response = await this.openai.chat.completions.create({
                model: "openai/gpt-3.5-turbo",
                messages: conversationMessages,
                tools: getAvailableTools(),
                tool_choice: "auto"
            });

            const responseMessage = response.choices[0].message;

            if (responseMessage.tool_calls) {
                const toolResults = await executeTools(responseMessage.tool_calls);
                conversationMessages.push(responseMessage);
                conversationMessages.push(...toolResults);
            } else {
                toolCallRequired = false;
                return responseMessage.content || "No response generated.";
            }
        }

        throw new Error("Task execution completed without a final response.");
    }
}
