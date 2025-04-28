export const getDiscountPrice = (price: number, discount: number) => {
    return (price / 100) * discount;
};
