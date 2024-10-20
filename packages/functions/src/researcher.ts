import { Resource } from "sst";
import { QueryOptimizer } from "./Researcher/agents/optimizer";
import { Router } from "./Researcher/router";

const apiKey = Resource.OpenRouterApiKey.value;
const optimizer = new QueryOptimizer(apiKey);
const router = new Router(optimizer, 3, apiKey); // Create 3 worker agents

export async function handler(event: any) {
  try {
    const query = event.queryStringParameters?.query || "What is the meaning of life?";

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
