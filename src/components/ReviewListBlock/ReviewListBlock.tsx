import type { FC } from 'react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import { ReviewList } from './ReviewList';

interface ReviewListBlockProps {
    productId: string;
    enableGoToAllReviewButton?: boolean;
}

export const ReviewListBlock: FC<ReviewListBlockProps> = ({ productId, enableGoToAllReviewButton = false }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenAllReviewsClick = useCallback(() => navigate('reviews', { state: true }), []);

    const handleAddReviewClick = useCallback(() => {
        //TODO: Придумать решение с использованием publicRoutePaths
        const navigatePath = location.pathname.includes('reviews') ? 'create' : 'reviews/create';
        navigate(navigatePath, { state: { from: location.pathname } });
    }, [location.pathname]);

    return (
        <Stack component="article" gap={2}>
            <Stack gap={1} alignItems="flex-start">
                <Typography component="header" variant="h4">
                    Отзывы
                </Typography>
                <Button variant="outlined" onClick={handleAddReviewClick}>
                    Написать отзыв
                </Button>
            </Stack>
            <ReviewList
                productId={productId}
                enableGoToAllReviewButton={enableGoToAllReviewButton}
                onAllReviewsClick={handleOpenAllReviewsClick}
            />
        </Stack>
    );
};
