import type { FC } from 'react';
import { ChevronRight } from '@mui/icons-material';
import { Button, CircularProgress, Stack } from '@mui/material';

import { EmptyBlock } from '$components/EmptyBlock';
import { ExceptionBlock } from '$components/ExceptionBlock';
import { useRtkQuery } from '$shared/hooks';
import { Center } from '$shared/ui';
import { useGetProductReviewListQuery } from '$store';

import { ReviewItem } from './ReviewItem';

interface ReviewListProps {
    productId: string;
    enableGoToAllReviewButton?: boolean;
    onAllReviewsClick: VoidFunction;
}

export const ReviewList: FC<ReviewListProps> = ({
    productId,
    enableGoToAllReviewButton = false,
    onAllReviewsClick,
}) => {
    const { isLoading, data, error, refetch } = useRtkQuery(useGetProductReviewListQuery, productId);

    if (isLoading) {
        return (
            <Center>
                <CircularProgress />
            </Center>
        );
    }

    if (error) {
        return <ExceptionBlock exception={error} onRepeat={refetch} />;
    }

    if (data.length === 0) {
        return <EmptyBlock title="На этот товар пока нет отзывов" />;
    }

    const resultReviews = enableGoToAllReviewButton ? data.slice(0, 2) : data;

    return (
        <Stack gap={2}>
            {resultReviews.map(review => (
                <ReviewItem key={review.id} review={review} />
            ))}
            {enableGoToAllReviewButton && (
                <Button variant="outlined" fullWidth endIcon={<ChevronRight />} onClick={onAllReviewsClick}>
                    Все отзывы
                </Button>
            )}
        </Stack>
    );
};
