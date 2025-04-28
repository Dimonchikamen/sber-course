import type { FC } from 'react';
import { Button, Rating, Skeleton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { REVIEW_UNITS } from '$shared/const';
import { useRtkQuery } from '$shared/hooks';
import { detectUnits } from '$shared/lib';
import { useGetAverageProductRatingQuery } from '$store';

interface ProductRatingProps {
    productId: string;
    reviewsCount: number;
}

export const ProductRating: FC<ProductRatingProps> = ({ productId, reviewsCount }) => {
    const {
        isLoading,
        data: ratingValue,
        error,
        refetch,
    } = useRtkQuery(useGetAverageProductRatingQuery, productId || '');

    if (isLoading) {
        return <Skeleton height="24px" width="200px" />;
    }

    if (error) {
        return (
            <Stack direction="row">
                Произошла ошибка <Button onClick={refetch}>Повторить</Button>
            </Stack>
        );
    }

    return (
        <Stack direction="row" alignItems="center" gap={2}>
            <Rating value={ratingValue} precision={0.1} readOnly />
            <Typography color={grey[500]}>{detectUnits(reviewsCount, REVIEW_UNITS)}</Typography>
        </Stack>
    );
};
