import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Stack, Typography } from '@mui/material';

import { ExceptionBlock, PriceWithDiscount, ProductRating, ReviewListBlock } from '$components';
import { ProductCartContainer } from '$components/ProductCartContainer';
import { useRtkQuery } from '$shared/hooks';
import { useGetProductByIdQuery } from '$store';
import { PageLoader, WithBackButton } from '$widgets';

export const ReviewListPage: FC = () => {
    const { productId = '' } = useParams();
    const { isLoading, data, error, refetch } = useRtkQuery(useGetProductByIdQuery, productId);

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        return <ExceptionBlock exception={error} onRepeat={refetch} />;
    }

    const { name, price, discount, images } = data;

    return (
        <WithBackButton>
            <Typography fontSize="28px" lineHeight="32px" fontWeight="bold">
                Отзывы о товаре &quot;{name}&quot;
            </Typography>
            <Stack direction="row" justifyContent="space-between" marginTop={2}>
                <Stack alignItems="center" direction="row" gap={2}>
                    <img src={images} width="80px" />
                    <Stack gap={1}>
                        <Typography fontSize="20px" lineHeight="24px" fontWeight="bold">
                            {name}
                        </Typography>
                        <ProductRating productId={productId} reviewsCount={data.reviews.length} />
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                    <PriceWithDiscount
                        price={price}
                        discount={discount}
                        typography="24_28"
                        enableFullPricePadding={false}
                    />
                    <ProductCartContainer productId={productId} stock={data.stock} />
                </Stack>
            </Stack>
            <Divider />
            <ReviewListBlock productId={productId} />
        </WithBackButton>
    );
};
