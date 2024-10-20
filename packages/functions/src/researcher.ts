import { Resource } from "sst";
import OpenAI from "openai";
import { QueryOptimizer } from "./Researcher/agents/optimizer";
import { Router } from "./Researcher/router";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: Resource.OpenRouterApiKey.value,
});

const optimizer = new QueryOptimizer(openai);
const router = new Router(optimizer, 3, Resource.OpenRouterApiKey.value);

export async function handler(event: any) {
  try {
    const query = extractQuery(event);

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No query provided' }),
      };
    }

    const results = await router.handleQuery(query);

    return {
      statusCode: 200,
      body: JSON.stringify({ results }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred processing your request' }),
    };
  }
}

function extractQuery(event: any): string {
  const requestBody = JSON.parse(event.body || '{}');
  return requestBody.query || event.queryStringParameters?.query || '';
}
