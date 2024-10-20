import { Resource } from 'sst';
import { WorkerPool } from './agents/workerPool';
import { Task, TaskResult } from './shared/taskTypes';
import { OpenAI } from 'openai';

export class Router {
    private workerPool: WorkerPool;
    private openai: OpenAI;

    constructor(numWorkers: number = 3) {
        this.workerPool = new WorkerPool(numWorkers);
        this.openai = new OpenAI({ apiKey: Resource.OpenRouterApiKey.value, baseURL: "https://openrouter.ai/api/v1" });
    }

    async handleQuery(query: string): Promise<{ results: TaskResult[], truncated: boolean }> {
        console.log('Router: Starting to handle query:', query);
        
        // Process the query through LLM
        const formattedQuery = await this.processQueryWithLLM(query);
        console.log('Router: Formatted query:', formattedQuery);

        const workerCount = this.workerPool.getWorkerCount();
        const tasks: Task[] = Array.from({ length: workerCount }, (_, i) => ({
            id: `task-${Date.now()}-${i}`,
            description: formattedQuery,
            parameters: {
                maxResults: 5,
                yearRange: '2023-2024'
            }
        }));

        try {
            const results = await this.workerPool.executeTasks(tasks);
            console.log('Router: All tasks completed');
            
            // Limit the response size
            const maxResponseSize = 30000; // Adjust this value as needed
            let responseString = JSON.stringify({ results });
            let truncated = false;

            if (responseString.length > maxResponseSize) {
                const truncatedResults = [];
                let currentSize = 0;
                for (const result of results) {
                    const resultString = JSON.stringify(result);
                    if (currentSize + resultString.length > maxResponseSize) {
                        truncated = true;
                        break;
                    }
                    truncatedResults.push(result);
                    currentSize += resultString.length;
                }
                return { results: truncatedResults, truncated };
            }

            return { results, truncated };
        } catch (error) {
            console.error('Router: Error handling query:', error);
            throw error;
        }
    }

    private async processQueryWithLLM(query: string): Promise<string> {
        try {
          const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant that formats research queries. Your task is to take a user's query and reformat it into a clear, concise, and specific research question. Respond with a JSON object containing the following fields: 'originalQuery', 'formattedQuery', 'keywords' (an array of relevant keywords), and 'context' (any additional context or clarification)." },
              { role: "user", content: query }
            ],
            max_tokens: 250
          });
      
          const content = response.choices[0].message.content.trim();
          
          // Ensure the response is valid JSON
          try {
            JSON.parse(content);
            return content;
          } catch (jsonError) {
            // If parsing fails, create a valid JSON response
            const fallbackResponse = JSON.stringify({
              originalQuery: query,
              formattedQuery: content,
              keywords: [],
              context: "Unable to generate structured response"
            });
            return fallbackResponse;
          }
        } catch (error) {
          console.error('Error processing query with LLM:', error);
          // Return a JSON response even in case of error
          return JSON.stringify({
            originalQuery: query,
            formattedQuery: query,
            keywords: [],
            context: "Error occurred during processing"
          });
        }
      }
}
