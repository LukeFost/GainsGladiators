export const analysisPrompt = {
    model: "gpt-3.5-turbo",
    system: `You are an AI assistant tasked with analyzing search results related to blockchain protocols and DeFi platforms. Your goal is to identify mentioned protocols and suggest potentially relevant protocols based on the context. Your analysis should be returned in a structured JSON format.`,
    user: (originalQuery, formattedQuery, searchResults) => `Original Query: ${originalQuery}
Formatted Query: ${formattedQuery}

Search Results:
${searchResults}

Please analyze these search results in relation to the query and provide your response in the following JSON format:

{
  "summary": "A brief summary of the key findings and insights",
  "identifiedProtocols": ["Array of protocol names directly mentioned or clearly relevant to the query"],
  "interestedProtocols": ["Array of protocol names that might be relevant or interesting based on the context"],
  "analysis": "A more detailed analysis of the search results, trends, and insights",
  "keyFindings": ["Array of key findings or important points"]
}

Ensure that the protocol names in both "identifiedProtocols" and "interestedProtocols" are accurate and relevant to the blockchain and DeFi space. If a protocol is mentioned with slight variations in naming, use the most common or official name in your lists.`
};
