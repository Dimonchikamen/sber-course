import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';

import { EmptyBlock, ExceptionBlock, WithProtection } from '$components';
import { PRODUCT_UNIT } from '$shared/const';
import { useRtkQuery } from '$shared/hooks';
import { detectUnits } from '$shared/lib';
import { publicRoutePaths } from '$shared/routes';
import { Center } from '$shared/ui';
import { useGetCartFullProductListQuery } from '$store';
import { CartProductList, CartResult, WithBackButton } from '$widgets';

export const CartPage: FC = WithProtection(() => {
    const { isLoading, data, error, refetch } = useRtkQuery(useGetCartFullProductListQuery, undefined);

    const navigate = useNavigate();

    const handleNavigateToProductList = useCallback(() => navigate(publicRoutePaths.products), []);

    if (isLoading) {
        return (
            <Center gap={2}>
                <CircularProgress size={80} />
                <Typography component="h1" variant="h4">
                    Загрузка корзины
                </Typography>
            </Center>
        );
    }

    if (error) {
        return <ExceptionBlock exception={error} onRepeat={refetch} />;
    }

    return (
        <WithBackButton
            contentNearButton={
                <Typography component="h1" variant="h4">
                    <Typography component="span" variant="h4" fontWeight="bold">
                        {detectUnits(data.count || 0, PRODUCT_UNIT)}
                    </Typography>{' '}
                    в корзине
                </Typography>
            }
        >
            {data.count === 0 ? (
                <Center>
                    <EmptyBlock
                        title="В корзине нет товаров"
                        description={'Добавьте товар, нажав на кнопку "В корзину" в карточке товара'}
                        actions={[{ label: 'На главную', onClick: handleNavigateToProductList }]}
                    />
                </Center>
            ) : (
                <Grid container gap={3}>
                    <Grid item xs={7}>
                        <CartProductList />
                    </Grid>
                    <Grid item xs={4} ml="auto">
                        <CartResult />
                    </Grid>
                </Grid>
            )}
        </WithBackButton>
    );
});
