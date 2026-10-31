
const UNKNOWN_AUTHOR = "Unknown author";

let currentQuote = null;
const listeners = new Set();

export const normalizeAuthor = (author) => {
    const value = String(author ?? "").trim();
    return value === UNKNOWN_AUTHOR ? "" : value;
};

// Same key format as before, so an existing localStorage history keeps working.
export const getQuoteKey = ({ quote, author }) =>
    JSON.stringify([
        String(quote).trim(),
        normalizeAuthor(author) || UNKNOWN_AUTHOR
    ]);

export const getCurrentQuote = () => currentQuote;

export const setCurrentQuote = (quote) => {
    currentQuote = quote
        ? { quote: quote.quote, author: normalizeAuthor(quote.author) }
        : null;

    listeners.forEach((listener) => listener(currentQuote));
};

export const onQuoteChange = (listener) => {
    listeners.add(listener);
    listener(currentQuote);
};

export const formatQuoteText = ({ quote, author }) =>
    author ? `“${quote}” — ${author}` : `“${quote}”`;
