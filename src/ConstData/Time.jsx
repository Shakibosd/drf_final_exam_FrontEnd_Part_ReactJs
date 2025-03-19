// eslint-disable-next-line no-unused-vars
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
};

export const longFormatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
};

export default longFormatDate;  