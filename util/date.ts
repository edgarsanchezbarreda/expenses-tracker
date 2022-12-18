export const getFormattedDate = (date: Date) => {
    // Return a string of a formatted date

    // 'Month' needs to add 1 to it because it returns the index of whatever date is given to it.
    // EX: month '01' (January) would return '0'. month '12' (December) would return '11'
    // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
