export const tools = [
  {
    type: "function",
    function: {
      name: "exa_search",
      description: "Perform a search query on the web using Exa AI, and retrieve the most relevant information.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query to perform.",
          },
        },
        required: ["query"]
      }
    }
  }
];

export function getAvailableTools() {
    return tools;
}
