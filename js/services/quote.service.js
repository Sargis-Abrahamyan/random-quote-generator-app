const API_URL = "https://quoteslate.vercel.app/api/quotes/random";

export const getDataService = async (categories = []) => {
    const url = new URL(API_URL);

    url.searchParams.set("count", "30");

    if (categories.length > 0) {
        url.searchParams.set("tags", categories.join(","));
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    const quotes = Array.isArray(data) ? data : [data];

    return quotes
        .filter(item => item && (item.quote || item.content))
        .map(item => ({
            quote: (item.quote || item.content).trim(),
            author: (item.author || "").trim(),
            category: item.tags?.[0] || ""
        }));
};