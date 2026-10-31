
import { getData, saveData } from "../utils/storage.js";
import { normalizeAuthor } from "./state.js";
import { showToast } from "./toast.js";

export const customQuotes = () => {
    const form = document.getElementById("customQuoteForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const quote = document.getElementById("customQuote").value.trim();
        const author = document.getElementById("customQuoteAuthor").value.trim();
        const category = document.getElementById("customQuoteCategory").value;

        if (!quote) return;

        if (!category) {
            showToast("Please choose a category.");
            return;
        }

        const savedQuotes = getData("customQuotes");
        const customQuotes = Array.isArray(savedQuotes)
            ? savedQuotes
            : [];

        const alreadyExists = customQuotes.some(item =>
            item.quote?.trim().toLowerCase() === quote.toLowerCase() &&
            normalizeAuthor(item.author).toLowerCase() === author.toLowerCase()
        );

        if (alreadyExists) {
            showToast("This quote is already in your list.");
            return;
        }

        const newQuote = {
            id: Date.now(),
            quote,
            author,
            category
        };

        customQuotes.push(newQuote);

        saveData("customQuotes", customQuotes);
        
        form.reset();
        document.getElementById("customQuoteModal")?.close();

        showToast("Your quote has been added!");
    });
};
