export const getDateLabel = (date: Date | string) => {
    const currentDate = date instanceof Date ? date : new Date(date);

    return currentDate.toLocaleString('ru', { day: '2-digit', month: 'short', year: 'numeric' });
};
