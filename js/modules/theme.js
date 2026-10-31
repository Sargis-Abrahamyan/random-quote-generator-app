import { getData, saveData } from "../utils/storage.js";

export const theme = () => {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (!themeToggle || !themeIcon) return;

    const savedTheme = getData("theme") === "light" ? "light" : "dark";

    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === "light" ? "dark" : "light";

        applyTheme(newTheme);
        saveData("theme", newTheme);
    });

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;

        themeIcon.innerHTML = theme === "dark"
            ? '<i data-lucide="moon" aria-hidden="true"></i>'
            : '<i data-lucide="sun" aria-hidden="true"></i>';

        // The label names the action, i.e. the theme you will switch TO.
        themeToggle.setAttribute(
            "aria-label",
            `Switch to ${theme === "dark" ? "light" : "dark"} theme`
        );

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
};
