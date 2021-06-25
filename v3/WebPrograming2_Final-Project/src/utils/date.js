const reduceDateFormat = (start) => {
    const startDate = new Date(start);

    const day = new Intl.DateTimeFormat("en", { day: "numeric" }).format(startDate);
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(startDate);

    const startHour = new Intl.DateTimeFormat("en", { timeStyle: "short", hour: "numeric" }).format(startDate);

    return `${month} - ${day}: ${startHour}`;
}

module.exports = {
    reduceDateFormat
};