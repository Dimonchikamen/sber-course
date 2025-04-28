import { isEmpty } from '../isEmpty';

describe('isEmpty', () => {
    it('Пустой объект', () => {
        expect(isEmpty({})).toBeTruthy();
    });

    it('Не пустой объект', () => {
        expect(isEmpty({ someField: '123' })).toBeFalsy();
    });

    it('Объект = null и undefined', () => {
        expect(isEmpty(undefined)).toBeTruthy();
        expect(isEmpty(null)).toBeTruthy();
    });
});
