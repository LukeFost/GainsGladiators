import { Resource } from "sst";
import OpenAI from "openai";
import { QueryOptimizer } from "./Researcher/agents/optimizer";
import { Router } from "./Researcher/router";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: Resource.OpenRouterApiKey.value,
});

const optimizer = new QueryOptimizer(openai);
const router = new Router(optimizer, 3, openai); // Create 3 worker agents

export async function handler(event: any) {
  try {
    // Extract the query from the incoming request
    const requestBody = JSON.parse(event.body || '{}');
    let query: string = requestBody.query || '';

    // If query is not in the body, check query parameters
    if (!query) {
      query = event.queryStringParameters?.query || '';
    }

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No query provided' }),
      };
    }

    // Handle the query using the Router
    const results = await router.handleQuery(query);

    // Combine results into a single response
    const combinedResult = results.map(r => r.result).join('\n\n');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: combinedResult
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred processing your request' }),
    };
  }
}