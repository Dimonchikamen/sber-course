import type { FC } from 'react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { Avatar, Grid, IconButton, Stack, Typography } from '@mui/material';

import { ExceptionBlock, WithProtection } from '$components';
import { useAppDispatch, useAppSelector } from '$shared/hooks';
import { publicRoutePaths } from '$shared/routes';
import { LabelWithText } from '$shared/ui';
import { authActions, cartApi, getUserByToken, userSelector } from '$store';
import { PageLoader, WithBackButton } from '$widgets';

export const ProfilePage: FC = WithProtection(() => {
    const dispatch = useAppDispatch();
    const {
        isLoading,
        user: { name, avatarPath, email, phone, about },
        exception,
    } = useAppSelector(userSelector);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserByToken());
    }, []);

    const handleLogoutClick = useCallback(() => {
        dispatch(authActions.logout());
        dispatch(cartApi.util.resetApiState());
        navigate(publicRoutePaths.products);
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    if (exception) {
        return <ExceptionBlock exception={exception} />;
    }

    return (
        <WithBackButton>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Grid container gridTemplateColumns="70px auto" gap={3}>
                    {name && (
                        <Grid item>
                            <Avatar alt={name} src={avatarPath} sx={{ width: 120, height: 120 }}>
                                {name?.slice(0, 2)}
                            </Avatar>
                        </Grid>
                    )}
                    <Grid item>
                        <Stack>
                            <Typography variant="h4" component="h4">
                                {name}
                            </Typography>
                            <LabelWithText label="Почта" text={email} direction="row" />
                            <LabelWithText label="Телефон" text={phone} direction="row" />
                            <LabelWithText label="Обо мне" text={about} />
                        </Stack>
                    </Grid>
                </Grid>
                <IconButton onClick={handleLogoutClick}>
                    <Logout />
                </IconButton>
            </Stack>
        </WithBackButton>
    );
});
