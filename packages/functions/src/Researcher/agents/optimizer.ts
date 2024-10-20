import { Task } from '../shared/taskTypes';
import OpenAI from 'openai';
import { getAvailableTools } from '../tools/toolDefinitions';

export class QueryOptimizer {
    private openai: OpenAI;

    constructor(openai: OpenAI) {
        this.openai = openai;
    }

    async optimizeQuery(query: string): Promise<Task[]> {
        console.log('Optimizer: Starting query optimization');
        try {
            const actions = await this.parseQueryIntoActions(query);
            const tasks = actions.map((action, index) => ({
                id: `task-${index + 1}`,
                description: action.description,
                parameters: action.parameters
            }));
            console.log('Optimizer: Query optimization successful');
            console.log('Optimized tasks:', JSON.stringify(tasks, null, 2));
            return tasks;
        } catch (error) {
            console.error('Optimizer: Error during query optimization:', error);
            throw error;
        }
    }

    private async parseQueryIntoActions(query: string): Promise<Array<{ description: string; parameters: Record<string, any> }>> {
        const prompt = `
        Given the following research query, break it down into a series of actionable tasks. 
        Each task should be specific and include any relevant parameters.
        Format the output as a JSON array of objects, where each object has a 'description' and a 'parameters' field.

        Query: ${query}

        Example output format:
        [
            {
                "description": "Search for recent academic papers on topic X",
                "parameters": {
                    "topic": "X",
                    "yearRange": "2020-2023",
                    "maxResults": 5
                }
            },
            {
                "description": "Analyze key findings from the papers",
                "parameters": {
                    "focusAreas": ["methodology", "results", "conclusions"]
                }
            }
        ]
        `;

        const completion = await this.openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            tools: getAvailableTools(),
            tool_choice: "auto"
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error("Failed to generate tasks from the query");
        }

        try {
            let parsedContent;
            if (content.includes('```json')) {
                // Extract JSON from markdown code block
                const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
                if (jsonMatch && jsonMatch[1]) {
                    parsedContent = JSON.parse(jsonMatch[1]);
                } else {
                    throw new Error("Failed to extract JSON from markdown");
                }
            } else {
                // Try parsing the content directly
                parsedContent = JSON.parse(content);
            }
            console.log('Optimizer: Successfully parsed AI response');
            console.log('Parsed content:', JSON.stringify(parsedContent, null, 2));
            return parsedContent || [];
        } catch (error) {
            console.error("Optimizer: Error parsing AI response:", error);
            throw new Error("Failed to parse the AI-generated tasks");
        }
    }
}
