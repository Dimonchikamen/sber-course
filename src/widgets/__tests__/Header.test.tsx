import { componentRender } from '$shared/lib';

import { Header } from '../Header';

describe('Шапка приложения. Пользователь не вошёл в аккаунт', () => {
    it('Должен всё отобразить', () => {
        const component = componentRender(<Header />);

        expect(component.container).toMatchSnapshot();
    });

    it('Должен иметь одно состояние независимо от роута', () => {
        let component = componentRender(<Header />, { route: '/' });
        expect(component.container).toMatchSnapshot();

        component = componentRender(<Header />, { route: '/not_found' });
        expect(component.container).toMatchSnapshot();
    });
});
