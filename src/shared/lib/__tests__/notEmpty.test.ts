import { notEmpty } from '../notEmpty';

describe('notEmpty', () => {
    it('Пустой объект', () => {
        expect(notEmpty({})).toBeFalsy();
    });

    it('Не пустой объект', () => {
        expect(notEmpty({ someField: '123' })).toBeTruthy();
    });

    it('Объект = null и undefined', () => {
        expect(notEmpty(undefined)).toBeFalsy();
        expect(notEmpty(null)).toBeFalsy();
    });
});
