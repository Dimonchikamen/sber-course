import type { FC } from 'react';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, TextField, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { object, string } from 'yup';

import type { RegisterData } from '$models';
import { useRtkMutation } from '$shared/hooks';
import { Button } from '$shared/ui';
import { useRegisterMutation } from '$store';

const registerSchema = object({
    name: string().required('Обязательное поле'),
    email: string().email('Неверный формат почты').required('Обязательное поле'),
    about: string(),
    password: string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .max(24, 'Пароль должен быть не длиннее 24 символов')
        .required('Обязательное поле'),
});

type RegisterFormProps = {
    onSuccessSubmit: VoidFunction;
    onNavigateToLoginClick: VoidFunction;
};

export const RegisterForm: FC<RegisterFormProps> = ({ onSuccessSubmit, onNavigateToLoginClick }) => {
    const [register, { isLoading, error, reset: resetMutation }] = useRtkMutation(useRegisterMutation);

    const { control, handleSubmit, reset } = useForm<RegisterData>({
        resolver: yupResolver(registerSchema),
    });

    const handleSuccessRegister = useCallback(() => {
        reset();
        resetMutation();
        onSuccessSubmit();
    }, []);

    const onSubmit = useCallback((data: RegisterData) => register(data, { onSuccess: handleSuccessRegister }), []);

    return (
        <Stack
            component="form"
            justifyContent="center"
            alignItems="center"
            gap={2}
            data-testid="RegisterForm"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h4">Регистрация</Typography>
            <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange }, fieldState }) => (
                    <TextField
                        value={value}
                        autoFocus
                        label="Ваше имя"
                        margin="dense"
                        fullWidth
                        disabled={isLoading}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        data-testid="RegisterForm_name__input"
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="about"
                render={({ field: { value, onChange } }) => (
                    <TextField
                        value={value}
                        label="О себе"
                        margin="dense"
                        fullWidth
                        multiline
                        minRows={2}
                        disabled={isLoading}
                        data-testid="RegisterForm_about__input"
                        onChange={onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange }, fieldState }) => (
                    <TextField
                        value={value}
                        label="Почта"
                        type="email"
                        margin="dense"
                        fullWidth
                        disabled={isLoading}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        data-testid="RegisterForm_email__input"
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
                        data-testid="RegisterForm_password__input"
                        onChange={onChange}
                    />
                )}
            />

            {error && (
                <Typography
                    component="span"
                    color={red[400]}
                    sx={{ width: '100%' }}
                    data-testid="RegisterForm_errorMessage__span"
                >
                    {error.message}
                </Typography>
            )}
            <Button
                type="button"
                fullWidth
                disabled={isLoading}
                data-testid="RegisterForm__switchToLogin__button"
                onClick={onNavigateToLoginClick}
            >
                У вас уже есть аккаунт? Войдите
            </Button>
            <Button
                variant="contained"
                type="submit"
                isLoading={isLoading}
                fullWidth
                data-testid="RegisterForm_submit__button"
            >
                Зарегистрироваться
            </Button>
        </Stack>
    );
};
