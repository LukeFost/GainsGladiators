import { Router } from "./Researcher/router";

const router = new Router();

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
