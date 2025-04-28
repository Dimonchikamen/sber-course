import { screen } from '@testing-library/react';

import { componentRender, noop } from '$shared/lib';

import { RegisterForm } from '../RegisterForm';

describe('Форма входа', () => {
    beforeEach(() => {
        componentRender(<RegisterForm onSuccessSubmit={noop} onNavigateToLoginClick={noop} />);
    });

    it('Проверка, что все элементы присутствуют. Ошибки входа нет', () => {
        const loginForm = screen.getByTestId('RegisterForm');
        const nameInput = screen.getByTestId('RegisterForm_name__input');
        const aboutInput = screen.getByTestId('RegisterForm_about__input');
        const emailInput = screen.getByTestId('RegisterForm_email__input');
        const password = screen.getByTestId('RegisterForm_password__input');
        const switchToRegisterButton = screen.getByTestId('RegisterForm__switchToLogin__button');
        const submitButton = screen.getByTestId('RegisterForm_submit__button');

        expect(loginForm).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(aboutInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(switchToRegisterButton).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
});
