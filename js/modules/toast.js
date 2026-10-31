let timer;

export const showToast = (message) => {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
};
