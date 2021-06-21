const reduceDateFormat = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const day = new Intl.DateTimeFormat("en", { day: "numeric" }).format(startDate);
    const month = new Intl.DateTimeFormat("en", { month: "long" }).format(startDate);

    const startHour = new Intl.DateTimeFormat("en", { hour: "numeric" }).format(startDate);
    const endHour = new Intl.DateTimeFormat("en", { hour: "numeric" }).format(endDate);
    const startMin = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(startDate);
    const endMin = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(endDate);

    return `${month} - ${day}: ${startHour}:${startMin} - ${endHour}:${endMin}`;
}

module.exports = {
    reduceDateFormat
};