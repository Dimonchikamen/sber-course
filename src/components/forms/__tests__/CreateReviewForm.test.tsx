import { fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { componentRender, noop } from '$shared/lib';

import { CreateReviewForm } from '../CreateReviewForm';

describe('Форма создания отзыва на товар', () => {
    beforeEach(() => {
        componentRender(<CreateReviewForm productId="id" onSuccessCreate={noop} />);
    });

    it('Проверка, что все элементы присутствуют. Ошибки создания нет', () => {
        const form = screen.getByTestId('CreateReviewForm__form');
        const ratingInput = screen.getByTestId('CreateReviewForm_rating__input');
        const textInput = screen.getByTestId('CreateReviewForm_text__input');
        const submitButton = screen.getByTestId('CreateReviewForm_submit__button');

        expect(form).toBeInTheDocument();
        expect(ratingInput).toBeInTheDocument();
        expect(textInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('При попытке отправить пустую форму покажутся ошибки', async () => {
        const mockFn = jest.fn(noop);

        const submitButton = screen.getByTestId('CreateReviewForm_submit__button');
        await userEvent.click(submitButton);

        expect(mockFn).not.toHaveBeenCalled();
        expect(screen.getAllByText('Обязательное поле')).toHaveLength(2);
    });

    it('При попытке выйти за пределы комментария покажется ошибка', async () => {
        const mockFn = jest.fn(noop);

        const textInput = screen.getByTestId('CreateReviewForm_text__input');
        const submitButton = screen.getByTestId('CreateReviewForm_submit__button');

        fireEvent.change(textInput, { target: { value: 'a'.repeat(2001) } });
        await userEvent.click(submitButton);

        expect(mockFn).not.toHaveBeenCalled();
        expect(screen.getByText('Комментарий должен быть не длиннее 2000 символов')).toBeInTheDocument();
    });
});
