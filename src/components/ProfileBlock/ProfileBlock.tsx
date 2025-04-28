import type { FC } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';

import { useAppDispatch, useAppSelector } from '$shared/hooks';
import { authRoutePaths } from '$shared/routes';
import { getUserByToken, isAuthSelector, userSelector } from '$store';

export const ProfileBlock: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthSelector);
    const {
        isLoading,
        user: { name },
    } = useAppSelector(userSelector);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            dispatch(getUserByToken());
        }
    }, [isAuth]);

    const handleClickProfile = () => navigate(authRoutePaths.profile, { state: true });

    if (isLoading) {
        return <CircularProgress />;
    }

    const labelText = isAuth ? name : 'Войти';

    return (
        <Button color="inherit" size="large" startIcon={<AccountCircle />} onClick={handleClickProfile}>
            {labelText}
        </Button>
    );
};
