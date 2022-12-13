export const getFormattedDate = ({ date }: { date: Date }) => {
    return `${date.getFullYear()}-${date.getMonth}-${date.getDate}`;
};
