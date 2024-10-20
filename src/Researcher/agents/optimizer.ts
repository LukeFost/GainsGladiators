import { Task } from '../shared/taskTypes';
import OpenAI from 'openai';

export class QueryOptimizer {
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.openai = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "X-Title": "GainsGladiators",
            }
        });
    }

    /**
     * Transforms a user query into a series of actionable tasks.
     * @param query - The input query string.
     * @returns An array of Task objects.
     */
    async optimizeQuery(query: string): Promise<Task[]> {
        const actions = await this.parseQueryIntoActions(query);
        return actions.map((action, index) => ({
            id: `task-${index + 1}`,
            description: action.description,
            params: action.params
        }));
    }

    /**
     * Parses the query into discrete actions using AI.
     * @param query - The input query string.
     * @returns An array of action objects.
     */
    private async parseQueryIntoActions(query: string): Promise<Array<{ description: string; params: Record<string, any> }>> {
        const prompt = `
        Given the following research query, break it down into a series of actionable tasks. 
        Each task should be specific and include any relevant parameters.
        Format the output as a JSON array of objects, where each object has a 'description' and a 'params' field.

        Query: ${query}

        Example output format:
        [
            {
                "description": "Search for recent academic papers on topic X",
                "params": {
                    "topic": "X",
                    "yearRange": "2020-2023",
                    "maxResults": 5
                }
            },
            {
                "description": "Analyze key findings from the papers",
                "params": {
                    "focusAreas": ["methodology", "results", "conclusions"]
                }
            }
        ]
        `;

        const completion = await this.openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error("Failed to generate tasks from the query");
        }

        try {
            const parsedContent = JSON.parse(content);
            return parsedContent.tasks || [];
        } catch (error) {
            console.error("Error parsing AI response:", error);
            throw new Error("Failed to parse the AI-generated tasks");
        }
    }
}
