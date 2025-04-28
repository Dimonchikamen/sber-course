import { getPriceText } from '../getPriceText';

describe('getPriceText', () => {
    it('Возвращает верный текст', () => {
        expect(getPriceText(100)).toEqual(`100,00${String.fromCharCode(160)}₽`);
    });

    it('Возвращает верный текст, с учётов копеек', () => {
        expect(getPriceText(100.56)).toEqual(`100,56${String.fromCharCode(160)}₽`);
    });
});
