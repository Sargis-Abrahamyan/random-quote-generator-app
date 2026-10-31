import { formatQuoteText, onQuoteChange, getCurrentQuote } from "./state.js";
import { showToast } from "./toast.js";

const buildShareUrl = (platform, text, pageUrl) => {
    const t = encodeURIComponent(text);
    const u = encodeURIComponent(pageUrl);

    switch (platform) {
        case "x":
            return `https://twitter.com/intent/tweet?text=${t}`;
        case "facebook":
            return `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${t}`;
        case "whatsapp":
            return `https://wa.me/?text=${t}`;
        case "telegram":
            return `https://t.me/share/url?url=${u}&text=${t}`;
        case "linkedin":
            return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
        default:
            return "#";
    }
};

export const shareQuote = () => {
    const links = document.querySelectorAll("[data-share]");
    const nativeButton = document.getElementById("nativeShare");

    // Keep the share links in sync with the quote on screen.
    onQuoteChange((quote) => {
        links.forEach((link) => {
            if (!quote) {
                link.href = "#";
                link.setAttribute("aria-disabled", "true");
                return;
            }

            link.href = buildShareUrl(
                link.dataset.share,
                formatQuoteText(quote),
                window.location.href
            );
            link.removeAttribute("aria-disabled");
        });

        if (nativeButton) {
            nativeButton.disabled = !quote;
        }
    });

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            if (link.getAttribute("aria-disabled") === "true") {
                event.preventDefault();
                showToast("Generate a quote first.");
            }
        });
    });

    // Native share sheet (mobile) – hidden where unsupported.
    if (!nativeButton) return;

    if (!navigator.share) {
        nativeButton.hidden = true;
        return;
    }

    nativeButton.addEventListener("click", async () => {
        const quote = getCurrentQuote();
        if (!quote) return;

        try {
            await navigator.share({
                title: "Random Quote",
                text: formatQuoteText(quote)
            });
        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Share error:", error);
                showToast("Unable to share quote.");
            }
        }
    });
};
