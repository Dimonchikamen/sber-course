import { componentRender } from '$shared/lib';

import { Footer } from '../Footer';

describe('Подвал приложения', () => {
    it('Должен всё отобразить', () => {
        const component = componentRender(<Footer />);

        expect(component.container).toMatchSnapshot();
    });

    it('Должен иметь одно состояние независимо от роута', () => {
        let component = componentRender(<Footer />, { route: '/' });
        expect(component.container).toMatchSnapshot();

        component = componentRender(<Footer />, { route: '/not_found' });
        expect(component.container).toMatchSnapshot();
    });
});
