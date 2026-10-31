
import { getDataService } from "../services/quote.service.js";
import { getData, saveData } from "../utils/storage.js";
import { getSelectedCategories } from "./categories.js";
import { FALLBACK_QUOTES } from "./fallbackQuotes.js";
import {
    getCurrentQuote,
    getQuoteKey,
    setCurrentQuote
} from "./state.js";

const ANIMATION_DELAY = 350;

let apiQuotes = [];
let lastCategories = "";

const getQuotesList = async (categories) => {
    const categoryKey = [...categories].sort().join(",");

    // Load quotes when categories change or cache is empty
    if (categoryKey !== lastCategories || apiQuotes.length === 0) {
        try {
            apiQuotes = await getDataService(categories);
        } catch (error) {
            console.warn("API unavailable. Using fallback quotes.", error);
            apiQuotes = [];
        }

        lastCategories = categoryKey;
    }

    const customQuotes = getData("customQuotes") || [];

    const filteredCustomQuotes = customQuotes.filter((quote) =>
        quote.quote?.trim() &&
        (
            categories.length === 0 ||
            categories.includes(quote.category)
        )
    );

    const fallbackQuotes = FALLBACK_QUOTES.filter((quote) =>
        categories.length === 0 ||
        categories.includes(quote.category)
    );

    const quotes = apiQuotes.length > 0
        ? apiQuotes
        : fallbackQuotes;

    return [...quotes, ...filteredCustomQuotes];
};

const pickQuote = async () => {
    const categories = getSelectedCategories();

    const quotes = await getQuotesList(categories);

    const displayedQuotes = getData("displayedQuotes") || [];
    const currentQuote = getCurrentQuote();

    const availableQuotes = quotes.filter((quote) =>
        quote.quote?.trim() &&
        !displayedQuotes.includes(getQuoteKey(quote))
    );

    // Reset history when all quotes have been displayed
    const remainingQuotes = availableQuotes.length > 0
        ? availableQuotes
        : quotes.filter((quote) =>
            getQuoteKey(quote) !== (
                currentQuote ? getQuoteKey(currentQuote) : null
            )
        );

    if (remainingQuotes.length === 0) {
        throw new Error("No quotes available.");
    }

    const randomIndex = Math.floor(
        Math.random() * remainingQuotes.length
    );

    const randomQuote = remainingQuotes[randomIndex];

    const updatedHistory = availableQuotes.length > 0
        ? [...displayedQuotes, getQuoteKey(randomQuote)]
        : [getQuoteKey(randomQuote)];

    saveData("displayedQuotes", updatedHistory);

    return randomQuote;
};

const renderQuote = (quote) => {
    const quoteContent = document.getElementById("quoteContent");
    const quoteAuthor = document.getElementById("quoteAuthor");

    if (!quote) {
        quoteContent.textContent = "No quotes available. Please add your own quotes.";
        quoteAuthor.textContent = "";
        quoteAuthor.classList.remove("has-author");
        return;
    }

    quoteContent.textContent = quote.quote;

    quoteAuthor.textContent = quote.author
        ? `Author — ${quote.author}`
        : "Unknown author";

    quoteAuthor.classList.toggle("has-author", Boolean(quote.author));
};

export const getQuotes = () => {
    const generateQuote = document.getElementById("generateQuote");
    const quoteContent = document.getElementById("quoteContent");
    const quoteAuthor = document.getElementById("quoteAuthor");

    if (!generateQuote || !quoteContent || !quoteAuthor) return;

    generateQuote.addEventListener("click", async () => {
        generateQuote.disabled = true;

        quoteContent.classList.add("is-changing");
        quoteAuthor.classList.add("is-changing");

        try {
            const [quote] = await Promise.all([
                pickQuote(),
                new Promise((resolve) =>
                    setTimeout(resolve, ANIMATION_DELAY)
                )
            ]);

            setCurrentQuote(quote);
            renderQuote(quote);
        } catch (error) {
            console.error(error);
            setCurrentQuote(null);
            renderQuote(null);
        } finally {
            quoteContent.classList.remove("is-changing");
            quoteAuthor.classList.remove("is-changing");
            generateQuote.disabled = false;
        }
    });
};
