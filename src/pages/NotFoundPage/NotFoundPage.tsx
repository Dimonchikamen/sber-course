import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, SentimentVeryDissatisfied } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import { publicRoutePaths } from '$shared/routes';

export const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    const handleBackClick = useCallback(() => navigate(-1), []);

    const handleMainClick = useCallback(() => navigate(publicRoutePaths.products), []);

    return (
        <Stack width="100%" justifyContent="center" alignContent="center" alignItems="center" gap={2}>
            <Stack direction="row" alignItems="center" gap={2}>
                <Typography component="h1" variant="h3">
                    Такой страницы нет
                </Typography>
                <SentimentVeryDissatisfied sx={{ width: 48, height: 48 }} />
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
                <Button variant="contained" startIcon={<ChevronLeft />} size="large" onClick={handleBackClick}>
                    Назад
                </Button>
                <Button variant="outlined" size="large" onClick={handleMainClick}>
                    На главную
                </Button>
            </Stack>
        </Stack>
    );
};
