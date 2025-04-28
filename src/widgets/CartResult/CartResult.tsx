import { type FC, useCallback } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';

import { useAppDispatch, useAppSelector } from '$shared/hooks';
import { getDiscountPrice, getPriceText } from '$shared/lib';
import { Button } from '$shared/ui';
import { cartApi } from '$store';

export const CartResult: FC = () => {
    const dispatch = useAppDispatch();
    const { data: { products = [], count = 0 } = {} } = useAppSelector(
        cartApi.endpoints.getCartFullProductList.select(undefined)
    );
    const fullPrice = products.reduce((prev, curr) => (prev += curr.product.price * curr.count), 0) || 0;
    const totalDiscount =
        products.reduce(
            (prev, { product: { price, discount }, count: currCount }) =>
                (prev += getDiscountPrice(price, discount) * currCount),
            0
        ) || 0;

    const handlePlaceOrderClick = useCallback(() => {
        dispatch(cartApi.util.resetApiState());
    }, []);

    return (
        <Box component="article" borderRadius={4} border="1px solid" borderColor={grey[300]} padding={4}>
            <Typography component="header" variant="h5">
                Ваша корзина
            </Typography>
            <Stack gap={4} marginTop={4}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color={grey[500]}>Товары ({count})</Typography>
                    <Typography>{getPriceText(fullPrice)}</Typography>
                </Stack>
                {totalDiscount != 0 && (
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography color={grey[400]}>Скидка</Typography>
                        <Typography color={red[400]}>{getPriceText(-totalDiscount)}</Typography>
                    </Stack>
                )}
                <Divider />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold">Общая стоимость</Typography>
                    <Typography fontWeight="bold">{getPriceText(fullPrice - totalDiscount)}</Typography>
                </Stack>
                <Button variant="contained" onClick={handlePlaceOrderClick}>
                    Оформить заказ
                </Button>
            </Stack>
        </Box>
    );
};
