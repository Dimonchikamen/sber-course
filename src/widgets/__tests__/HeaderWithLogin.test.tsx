import type { StateSchema } from '$models';
import { componentRender } from '$shared/lib';

import { Header } from '../Header';

describe('Шапка приложения. Пользователь вошёл в аккаунт', () => {
    const initialState: DeepPartial<StateSchema> = {
        auth: {
            isAuth: true,
        },
        user: {
            user: {
                id: 'user-id',
                name: 'user name',
                likes: [
                    { id: '1', productId: '1', userId: 'user-id' },
                    { id: '1', productId: '2', userId: 'user-id' },
                ],
            },
        },
    };

    it('Должен всё отобразить', () => {
        const component = componentRender(<Header />, {
            initialState,
        });

        expect(component.container).toMatchSnapshot();
    });

    it('Должен иметь одно состояние независимо от роута', () => {
        let component = componentRender(<Header />, { route: '/', initialState });
        expect(component.container).toMatchSnapshot();

        component = componentRender(<Header />, { route: '/not_found', initialState });
        expect(component.container).toMatchSnapshot();
    });
});
