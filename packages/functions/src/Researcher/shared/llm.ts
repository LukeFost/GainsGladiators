import { OpenAI } from 'openai';
import { Resource } from 'sst';

const openai = new OpenAI({ apiKey: Resource.OpenRouterApiKey.value, baseURL: "https://openrouter.ai/api/v1" });

/**
 * Processes a query using a specified Language Model.
 * 
 * This function sends a request to the OpenAI API to process a given query
 * using a specified model and prompt. It's designed to be flexible and reusable
 * across different parts of the application that require LLM processing.
 * 
 * @param query - The user's input query to be processed
 * @param model - The name of the OpenAI model to use (e.g., "gpt-3.5-turbo")
 * @param system - The system message that sets the context for the AI
 * @param user - The user message, typically including the query
 * 
 * @returns A Promise that resolves to the processed query result as a string
 * 
 * @example
 * const result = await processQueryWithLLM(
 *   "What are the benefits of exercise?",
 *   "gpt-3.5-turbo",
 *   "You are a helpful assistant that formats research queries.",
 *   "Format this query: What are the benefits of exercise?"
 * );
 * console.log(result);
 */
export async function processQueryWithLLM(query: string, model: string, system: string, user: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
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
