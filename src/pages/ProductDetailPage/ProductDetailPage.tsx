import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';

import { ExceptionBlock, PriceWithDiscount, ProductFavorite, ProductRating, ReviewListBlock } from '$components';
import { ProductCartContainer } from '$components/ProductCartContainer';
import { useAppSelector, useRtkQuery } from '$shared/hooks';
import { LabelWithText } from '$shared/ui';
import { authUserSelector, useGetProductByIdQuery } from '$store';
import { PageLoader, WithBackButton } from '$widgets';

export const ProductDetailPage: FC = () => {
    const { productId = '' } = useParams();
    const { id } = useAppSelector(authUserSelector);
    const { isLoading, data: product, error, refetch } = useRtkQuery(useGetProductByIdQuery, productId);

    if (error) {
        return <ExceptionBlock exception={error} onRepeat={refetch} />;
    }

    if (isLoading) {
        return <PageLoader />;
    }

    const isFavorite = product.likes.some(like => like.userId === id);
    const label = isFavorite ? 'Убрать из избранного' : 'Добавить в избранное';

    return (
        <WithBackButton marginBottom={4}>
            <Typography component="h1" variant="h4">
                {product.name}
            </Typography>
            <ProductRating productId={productId} reviewsCount={product.reviews.length} />
            <Grid container gap={3} gridTemplateColumns="auto auto">
                <Grid item xs={4}>
                    <img src={product.images} width="100%" />
                </Grid>
                <Grid item xs>
                    <Stack direction="column" gap={1} width="100%">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                            <PriceWithDiscount
                                price={product.price}
                                discount={product.discount}
                                typography="24_28"
                                enableFullPricePadding={false}
                            />
                            <ProductFavorite productId={productId} isFavorite={isFavorite} label={label} />
                        </Stack>
                        <ProductCartContainer productId={productId} stock={product.stock} />
                        {product.category && (
                            <LabelWithText label="Категория" text={product.category.name} direction="row" />
                        )}
                        <LabelWithText label="Осталось" text={`${product.stock} шт.`} direction="row" />
                    </Stack>
                </Grid>
            </Grid>
            <Stack direction="column" gap={1} width="100%">
                <LabelWithText label="Описание" text={product.description} />
            </Stack>
            <ReviewListBlock productId={productId} enableGoToAllReviewButton />
        </WithBackButton>
    );
};
