import { getData, saveData } from "../utils/storage.js";

export const CATEGORIES = [
    {
        label: "Motivation",
        value: "motivation"
    },
    {
        label: "Love",
        value: "love"
    },
    {
        label: "Wisdom",
        value: "wisdom"
    }
];

export const getSelectedCategories = () =>
    [...document.querySelectorAll(".categories__checkbox:checked")]
        .map(({ value }) => value);

export const saveSelectedCategories = () =>
    saveData("categories", getSelectedCategories());

export const renderCategories = () => {
    const categoriesList = document.getElementById("categoriesList");

    if (!categoriesList) return;

    const savedCategories = getData("categories") || [];

    categoriesList.innerHTML = CATEGORIES.map(category => `
    <li class="categories__item">
        <label class="categories__label">
            <input
                class="categories__checkbox"
                type="checkbox"
                name="categories"
                value="${category.value}"
                ${savedCategories.includes(category.value) ? "checked" : ""}
            />
            ${category.label}
        </label>
    </li>
`).join("");

    categoriesList.addEventListener("change", saveSelectedCategories);
};