import { ChatCompletionMessageToolCall } from "openai/resources/chat/completions";
import * as toolImplementations from './toolImplementations';

type ToolImplementations = typeof toolImplementations;

export async function executeTools(toolCalls: ChatCompletionMessageToolCall[]): Promise<Array<{ role: string, content: string, tool_call_id: string }>> {
    const results = [];

    for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name as keyof ToolImplementations;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        console.log(`Executing tool: ${functionName}`, functionArgs);

        if (functionName in toolImplementations) {
            const implementation = toolImplementations[functionName] as (args: any) => Promise<string>;
            try {
                const result = await implementation(functionArgs);
                console.log(`Tool ${functionName} executed successfully`);
                results.push({
                    role: "tool",
                    content: result,
                    tool_call_id: toolCall.id
                });
            } catch (error) {
                console.error(`Error executing tool ${functionName}:`, error);
                results.push({
                    role: "tool",
                    content: `Error executing ${functionName}: ${error instanceof Error ? error.message : String(error)}`,
                    tool_call_id: toolCall.id
                });
            }
        } else {
            console.error(`Function ${functionName} not found`);
            results.push({
                role: "tool",
                content: `Error: Function ${functionName} not found`,
                tool_call_id: toolCall.id
            });
        }
    }

    return results;
}
