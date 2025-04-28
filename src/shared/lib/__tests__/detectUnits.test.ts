import { detectUnits } from '../detectUnits';

describe('detectUnits', () => {
    const units = ['рубль', 'рубля', 'рублей'] as [string, string, string];

    it('Должен вернуть первое значение', () => {
        const values = [1, 21, 1001];
        values.forEach(value => expect(detectUnits(value, units)).toEqual(`${value} ${units[0]}`));
    });

    it('Должен вернуть второе значение', () => {
        const values = [22, 44, 74, 102, 1004, 100003];
        values.forEach(value => expect(detectUnits(value, units)).toEqual(`${value} ${units[1]}`));
    });

    it('Должен вернуть третье значение', () => {
        const values = [12, 7, 79, 90, 85, 100, 10_000, 1_000_000];
        values.forEach(value => expect(detectUnits(value, units)).toEqual(`${value} ${units[2]}`));
    });
});
