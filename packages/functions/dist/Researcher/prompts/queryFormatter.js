export const queryFormatterPrompt = {
    model: "gpt-3.5-turbo",
    system: "You are a helpful assistant that formats research queries. Your task is to take a user's query and reformat it into a clear, concise, and specific research question. Respond with a JSON object containing the following fields: 'originalQuery', 'formattedQuery', 'keywords' (an array of relevant keywords), and 'context' (any additional context or clarification).",
    user: (query) => query
};
