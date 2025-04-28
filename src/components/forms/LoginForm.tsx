import type { FC } from 'react';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { object, string } from 'yup';

import type { LoginData } from '$models';
import { useRtkMutation } from '$shared/hooks';
import { Button } from '$shared/ui';
import { authActions, useLoginMutation } from '$store';

const loginSchema = object({
    email: string().email('Неверный формат почты').required('Обязательное поле'),
    password: string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .max(24, 'Пароль должен быть не длиннее 24 символов')
        .required('Обязательное поле'),
});

type LoginFormProps = {
    onSuccessSubmit: VoidFunction;
    onNavigateToRegisterClick: VoidFunction;
};

export const LoginForm: FC<LoginFormProps> = ({ onSuccessSubmit, onNavigateToRegisterClick }) => {
    const [login, { isLoading, error, reset: resetMutation }] = useRtkMutation(useLoginMutation, {
        onSuccessDispatchAction: authActions.setUser,
    });

    const { control, handleSubmit, reset } = useForm<LoginData>({
        resolver: yupResolver(loginSchema),
    });

    const handleSuccessLogin = useCallback(() => {
        reset();
        resetMutation();
        onSuccessSubmit();
    }, []);

    const onSubmit = useCallback((data: LoginData) => login(data, { onSuccess: handleSuccessLogin }), []);

    return (
        <Stack
            component="form"
            justifyContent="center"
            alignItems="center"
            gap={2}
            data-testid="LoginForm"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h4">Вход в аккаунт</Typography>
            <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange }, fieldState }) => (
                    <TextField
                        value={value}
                        autoFocus
                        label="Почта"
                        type="email"
                        margin="dense"
                        fullWidth
                        disabled={isLoading}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        data-testid="LoginForm_email__input"
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange }, fieldState }) => (
                    <TextField
                        value={value}
                        label="Пароль"
                        type="password"
                        margin="dense"
                        fullWidth
                        disabled={isLoading}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        data-testid="LoginForm_password__input"
                        onChange={onChange}
                    />
                )}
            />
            {error && (
                <Typography
                    component="span"
                    color={red[400]}
                    sx={{ width: '100%' }}
                    data-testid="LoginForm_errorMessage__span"
                >
                    {error.message}
                </Typography>
            )}
            <Button
                type="button"
                fullWidth
                disabled={isLoading}
                data-testid="LoginForm__switchToRegister__button"
                onClick={onNavigateToRegisterClick}
            >
                Нет аккаунта? Зарегистрируйтесь
            </Button>
            <Button
                variant="contained"
                type="submit"
                isLoading={isLoading}
                fullWidth
                data-testid="LoginForm_submit__button"
            >
                Войти
            </Button>
        </Stack>
    );
};
