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
  },
  {
    type: "function",
    function: {
      name: "search_academic_papers",
      description: "Search for recent academic papers on a given topic",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description: "The topic to search for"
          },
          yearRange: {
            type: "string",
            description: "The year range to search within (e.g., '2020-2023')"
          },
          maxResults: {
            type: "number",
            description: "The maximum number of results to return"
          }
        },
        required: ["topic"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "analyze_findings",
      description: "Analyze key findings from academic papers",
      parameters: {
        type: "object",
        properties: {
          papers: {
            type: "array",
            items: {
              type: "string"
            },
            description: "An array of paper titles or abstracts to analyze"
          },
          focusAreas: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Areas to focus on in the analysis (e.g., ['methodology', 'results', 'conclusions'])"
          }
        },
        required: ["papers"]
      }
    }
  }
];

export function getAvailableTools() {
    return tools;
}
