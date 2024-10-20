// This will be where the AI researcher chain will go
// This chain will have an input and an output return.
// The chain will start with a query optimizer
// Then there will be the parrallel instantiation of X workers
// Each worker will have the code tool with a trained format.
// Once the workers get their answer and return it
// A tokenizer checks the size and if it is too big then it is split in half, else
// it is sent back as a response.

//OpenRouterApiKey

//1. Create the basic api outline for lambda and call 

//2. 



import { Resource } from "sst";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: Resource.OpenRouterApiKey.value,
  defaultHeaders: {
    "X-Title": "GainsGladiators",
  }
});

export async function handler(event: any) {
  try {
    const query = event.queryStringParameters?.query || "What is the meaning of life?";

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": query
        }
      ]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: completion.choices[0].message.content
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