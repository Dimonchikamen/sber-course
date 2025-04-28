import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, Stack, Typography } from '@mui/material';

import { CreateReviewForm, WithProtection } from '$components';
import { useRtkQuery } from '$shared/hooks';
import { useGetProductByIdQuery } from '$store';
import { WithBackButton } from '$widgets';

export const CreateReviewPage: FC = WithProtection(() => {
    const { productId = '' } = useParams();
    const navigate = useNavigate();

    const { data: { name = '' } = {} } = useRtkQuery(useGetProductByIdQuery, productId);

    const handleSuccessCreate = useCallback(() => navigate(-1), []);

    return (
        <WithBackButton marginLeft="auto" marginRight="auto" sx={{ maxWidth: '940px' }}>
            <Stack gap={1}>
                <Typography fontSize="28px" lineHeight="32px" fontWeight="bold">
                    Отзыв о товаре &quot;{name}&quot;
                </Typography>
                <Divider />
            </Stack>
            <CreateReviewForm productId={productId} onSuccessCreate={handleSuccessCreate} />
        </WithBackButton>
    );
});
