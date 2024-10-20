import { Resource } from "sst";
import { QueryOptimizer } from "./Researcher/agents/optimizer";
import { Router } from "./Researcher/router";
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: Resource.OpenRouterApiKey.value,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://gainsgladiators.com",
    "X-Title": "GainsGladiators",
  }
});

// Pass the OpenAI instance to QueryOptimizer
const optimizer = new QueryOptimizer(openai);
const router = new Router(optimizer, 3, openai);

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
