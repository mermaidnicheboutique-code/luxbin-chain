/**
 * Web Search Utilities for AI
 * Enables the AI to search the internet for current information
 */

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

interface SearchResponse {
  results: SearchResult[];
  query: string;
}

/**
 * Search the web using DuckDuckGo HTML API (free, no API key needed)
 */
export async function searchWeb(query: string, numResults: number = 5): Promise<SearchResponse> {
  try {
    // Use DuckDuckGo HTML search (free alternative)
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LuxbinAI/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const html = await response.text();
    const results = parseSearchResults(html, numResults);

    return {
      query,
      results,
    };
  } catch (error) {
    console.error('Web search error:', error);
    return {
      query,
      results: [],
    };
  }
}

/**
 * Parse DuckDuckGo HTML search results
 */
function parseSearchResults(html: string, numResults: number): SearchResult[] {
  const results: SearchResult[] = [];

  // Simple regex-based parsing (could be improved with a proper HTML parser)
  const resultRegex = /<a[^>]*class="result__a"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([^<]*)<\/a>/g;

  let match;
  let count = 0;

  while ((match = resultRegex.exec(html)) !== null && count < numResults) {
    const url = decodeURIComponent(match[1]);
    const title = match[2].trim();
    const snippet = match[3].trim().replace(/<[^>]*>/g, '');

    if (url && title && snippet) {
      results.push({ url, title, snippet });
      count++;
    }
  }

  return results;
}

/**
 * Format search results for AI consumption
 */
export function formatSearchResults(searchResponse: SearchResponse): string {
  if (searchResponse.results.length === 0) {
    return `No web results found for: "${searchResponse.query}"`;
  }

  let formatted = `Web search results for: "${searchResponse.query}"\n\n`;

  searchResponse.results.forEach((result, index) => {
    formatted += `${index + 1}. ${result.title}\n`;
    formatted += `   ${result.snippet}\n`;
    formatted += `   Source: ${result.url}\n\n`;
  });

  return formatted;
}

/**
 * Brave Search API (alternative - requires API key)
 * Uncomment and use this if you have a Brave Search API key
 */
/*
export async function searchWebBrave(query: string, numResults: number = 5): Promise<SearchResponse> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;

  if (!apiKey) {
    throw new Error('Brave Search API key not configured');
  }

  try {
    const response = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=${numResults}`,
      {
        headers: {
          'X-Subscription-Token': apiKey,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Brave Search failed: ${response.statusText}`);
    }

    const data = await response.json();

    const results: SearchResult[] = data.web?.results?.map((r: any) => ({
      title: r.title,
      snippet: r.description,
      url: r.url,
    })) || [];

    return { query, results };
  } catch (error) {
    console.error('Brave Search error:', error);
    return { query, results: [] };
  }
}
*/
