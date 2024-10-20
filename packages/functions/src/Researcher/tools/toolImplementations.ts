import axios from 'axios';

const EXAAI_API_KEY = process.env.EXAAI_API_KEY;
const API_URL = 'https://api.exa.ai/search';

interface ExaResult {
  title: string;
  url: string;
  publishedDate: string;
  author: string;
  text: string;
  summary: string;
  score: number;
  id: string;
  image?: string;
}

function processExaResults(results: any[]): ExaResult[] {
  return results.map((result): ExaResult => ({
    title: result.title || 'No title',
    url: result.url || 'No URL',
    publishedDate: result.publishedDate || 'No date',
    author: result.author || 'No author',
    text: result.text || 'No text',
    summary: result.summary || 'No summary available',
    score: result.score || 0,
    id: result.id || '',
    image: result.image
  }));
}

function analyzeResults(results: ExaResult[]): string {
  results.sort((a, b) => b.score - a.score);

  let analysis = "Analysis of top search results:\n\n";

  results.slice(0, 5).forEach((result, index) => {
    analysis += `${index + 1}. ${result.title}\n`;
    analysis += `   URL: ${result.url}\n`;
    analysis += `   Published: ${result.publishedDate}\n`;
    analysis += `   Author: ${result.author}\n`;
    analysis += `   Summary: ${result.summary}\n`;
    analysis += `   Score: ${result.score.toFixed(2)}\n`;
    analysis += "\n";
  });

  return analysis;
}

export async function exa_search(params: { query: string }): Promise<string> {
  try {
    logger.info(`Starting Exa search with query: ${params.query}`);

    const response = await axios.post(API_URL, {
      query: params.query,
      useAutoprompt: true,
      type: 'auto',
      category: 'Tweet',
      numResults: 20,
      excludeDomains: ['en.wikipedia.org'],
      startPublishedDate: '2023-01-01T00:00:00.000Z',
      contents: {
        summary: {
          query: params.query
        }
      }
    }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-key': EXAAI_API_KEY
      }
    });

    logger.info(`Raw Exa search result: ${JSON.stringify(response.data, null, 2)}`);

    if (response.data?.results?.length > 0) {
      const processedResults = processExaResults(response.data.results);
      const analysis = analyzeResults(processedResults);

      logger.info(`Processed Exa search result: ${analysis}`);
      return analysis;
    } else {
      logger.info("No relevant results found in Exa search");
      return 'No relevant results found based on the query.';
    }
  } catch (error) {
    logger.error(`Error during Exa AI search: ${error}`);
    return 'There was an error during the search.';
  }
}

export async function search_academic_papers(params: any): Promise<string> {
    // Implement the actual search logic here
    // For now, we'll return a mock result
    return JSON.stringify({
        papers: [
            { title: "Recent Advances in AI", year: 2022 },
            { title: "Machine Learning in Healthcare", year: 2021 },
            { title: "Natural Language Processing Breakthroughs", year: 2023 }
        ]
    });
}

export async function analyze_findings(params: any): Promise<string> {
    // Implement the actual analysis logic here
    // For now, we'll return a mock result
    return JSON.stringify({
        analysis: "The papers show significant progress in AI applications across various domains.",
        keyFindings: [
            "Improved accuracy in medical diagnosis using ML",
            "Enhanced natural language understanding in NLP models",
            "Ethical considerations in AI deployment"
        ]
    });
}
