import { screen } from '@testing-library/react';

import { componentRender, noop } from '$shared/lib';

import { LoginForm } from '../LoginForm';

describe('Форма входа', () => {
    beforeEach(() => {
        componentRender(<LoginForm onSuccessSubmit={noop} onNavigateToRegisterClick={noop} />);
    });

    it('Проверка, что все элементы присутствуют. Ошибки входа нет', () => {
        const loginForm = screen.getByTestId('LoginForm');
        const emailInput = screen.getByTestId('LoginForm_email__input');
        const password = screen.getByTestId('LoginForm_password__input');
        const switchToRegisterButton = screen.getByTestId('LoginForm__switchToRegister__button');
        const submitButton = screen.getByTestId('LoginForm_submit__button');

        expect(loginForm).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(switchToRegisterButton).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
});
