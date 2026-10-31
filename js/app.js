import { theme } from "./modules/theme.js";
import { renderCategories } from "./modules/categories.js";
import { getQuotes } from "./modules/quotes.js";
import { shareQuote } from "./modules/share.js";
import { copyQuote } from "./modules/copy.js";
import { customQuotes } from "./modules/customQuotes.js";
import { customQuoteModal } from "./modules/customQuoteModal.js";
import { categoryDropdown } from "./modules/dropdown.js";

(function app() {
    theme();
    renderCategories();
    shareQuote();
    copyQuote();
    getQuotes();
    customQuotes();
    customQuoteModal();
    categoryDropdown();
})();

