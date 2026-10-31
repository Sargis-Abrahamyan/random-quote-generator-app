export const customQuoteModal = () => {
    const modal = document.getElementById("customQuoteModal");
    const openButton = document.getElementById("openCustomQuoteModal");
    const closeButton = document.getElementById("closeCustomQuoteModal");
    const form = document.getElementById("customQuoteForm");

    if (!modal || !openButton || !closeButton || !form) return;

    openButton.addEventListener("click", () => {
        modal.showModal();
    });

    closeButton.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });

    modal.addEventListener("close", () => {
        form.reset();
    });
};