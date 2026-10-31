import { formatQuoteText, getCurrentQuote } from "./state.js";
import { showToast } from "./toast.js";

export const copyQuote = () => {
    const copyButton = document.getElementById("copyQuote");

    if (!copyButton) return;

    copyButton.addEventListener("click", async () => {
        const quote = getCurrentQuote();

        if (!quote) {
            showToast("Generate a quote first.");
            return;
        }

        try {
            await navigator.clipboard.writeText(formatQuoteText(quote));
            showToast("Quote copied to clipboard!");
        } catch (error) {
            console.error("Copy error:", error);
            showToast("Unable to copy quote.");
        }
    });
};
