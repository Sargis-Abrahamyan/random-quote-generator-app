export const saveData = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Failed to save data:", error);
    }
};

export const getData = (key) => {
    try {
        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Failed to get data:", error);
        return null;
    }
};