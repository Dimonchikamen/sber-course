import { noop } from '../noop';

describe('noop', () => {
    it('Вызывается без ошибок и ничего не возвращает', () => {
        expect(noop()).toBeUndefined();
    });
});
