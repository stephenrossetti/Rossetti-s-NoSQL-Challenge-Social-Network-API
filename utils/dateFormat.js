// Utilized predefined dateFormat function to help make date and time easier to read //
const dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
};

module.exports = dateFormat;