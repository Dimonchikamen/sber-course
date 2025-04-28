import { getPriceWithDiscount } from '../getPriceWithDiscount';

describe('getPriceWithDiscount', () => {
    it('Цена = 100, скидка = 0', () => {
        expect(getPriceWithDiscount(100, 0)).toEqual(100);
    });

    it('Цена = 100, скидка = 10', () => {
        expect(getPriceWithDiscount(100, 10)).toEqual(90);
    });
});
