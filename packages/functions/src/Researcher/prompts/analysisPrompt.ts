export const analysisPrompt = {
  model: "gpt-3.5-turbo",
  system: "You are an AI assistant tasked with analyzing search results and providing a comprehensive summary. Your analysis should include key findings, trends, and insights based on the search results and the original query. Be concise yet informative.",
  user: (originalQuery: string, formattedQuery: string, searchResults: string) => 
    `Original Query: ${originalQuery}\nFormatted Query: ${formattedQuery}\n\nSearch Results:\n${searchResults}\n\nPlease provide a comprehensive analysis of these search results in relation to the query.`
};
