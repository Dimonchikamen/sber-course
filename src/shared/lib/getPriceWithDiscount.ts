export const getPriceWithDiscount = (price: number, discount: number) => {
    return discount > 0 ? price - (price / 100) * discount : price;
};
