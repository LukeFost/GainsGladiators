import { ChatCompletionMessageToolCall } from "openai/resources/chat/completions";
import * as toolImplementations from './toolImplementations';

type ToolImplementations = typeof toolImplementations;

export async function executeTools(toolCalls: ChatCompletionMessageToolCall[]): Promise<Array<{ role: string, content: string, tool_call_id: string }>> {
    const results = [];

    for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name as keyof ToolImplementations;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        if (functionName in toolImplementations) {
            const implementation = toolImplementations[functionName] as (args: any) => Promise<string>;
            const result = await implementation(functionArgs);
            results.push({
                role: "tool",
                content: result,
                tool_call_id: toolCall.id
            });
        } else {
            results.push({
                role: "tool",
                content: `Error: Function ${functionName} not found`,
                tool_call_id: toolCall.id
            });
        }
    }

    return results;
}
