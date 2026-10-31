import { CATEGORIES } from "./categories.js";

export const categoryDropdown = () => {
    const dropdown = document.getElementById("categoryDropdown");
    const trigger = document.getElementById("categoryTrigger");
    const menu = document.getElementById("categoryMenu");
    const selectedText = document.getElementById("categorySelected");
    const categoryInput = document.getElementById("customQuoteCategory");
    const form = document.getElementById("customQuoteForm");
    if (!dropdown || !trigger || !menu || !selectedText || !categoryInput) return;

    // Build the options from the same list the checkboxes use.
    menu.innerHTML = CATEGORIES.map(({ label, value }) => `
        <li class="custom-dropdown__option" data-value="${value}">${label}</li>
    `).join("");

    const options = menu.querySelectorAll(".custom-dropdown__option");

    const closeDropdown = () => {
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");

    };

    const toggleDropdown = () => {
        const isOpen = dropdown.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(isOpen));
    };

    trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleDropdown();
    });

    options.forEach((option) => {
        option.addEventListener("click", () => {
            const value = option.dataset.value;
            const text = option.textContent.trim();

            if (!value || !text) return;

            categoryInput.value = value;
            selectedText.textContent = text;

            options.forEach((item) => {
                item.classList.remove("is-selected");
            });

            option.classList.add("is-selected");

            closeDropdown();
        });
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDropdown();
        }
    });

    form.addEventListener("reset", () => {
        categoryInput.value = "";
        selectedText.textContent = "Select category";

        options.forEach((option) => {
            option.classList.remove("is-selected");
        });

        closeDropdown();
    });
};