import type { FC } from 'react';
import { Divider, Rating, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import type { ProductReview } from '$models';
import { getDateLabel } from '$shared/lib';

interface ReviewItemProps {
    review: ProductReview;
}

export const ReviewItem: FC<ReviewItemProps> = ({ review: { user, rating, text, createdAt } }) => {
    return (
        <Stack gap={1} marginTop={1}>
            <Divider />
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography>{user.name}</Typography>
                <Typography color={grey[400]}>{getDateLabel(createdAt)}</Typography>
            </Stack>
            <Rating value={rating} readOnly />
            <Typography>{text}</Typography>
        </Stack>
    );
};
