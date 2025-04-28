import type { FC } from 'react';
import { Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import type { Product } from '$models';

import { PriceWithDiscount } from '../PriceWithDiscount';
import { ProductCartContainer } from '../ProductCartContainer';
import { ProductFavorite } from '../ProductFavorite';

interface ProductCardProps {
    product: Product;
    isFavorite: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({
    product: { id, discount, name, price, stock, images },
    isFavorite,
}) => {
    const isDiscounted = discount > 0;
    const discountText = `-${discount}%`;

    return (
        <Card sx={{ position: 'relative' }} elevation={4}>
            {isDiscounted && (
                <Chip sx={{ position: 'absolute', left: 4, top: 4 }} label={discountText} color="error" size="small" />
            )}
            <Stack sx={{ height: '180px', cursor: 'pointer' }} justifyContent="center" alignItems="center">
                <img src={images} width="auto" height="100%" />
            </Stack>
            <CardActions sx={{ position: 'absolute', right: 4, top: 4, margin: 0, padding: 0 }}>
                <ProductFavorite productId={id} isFavorite={isFavorite} />
            </CardActions>
            <CardContent>
                <PriceWithDiscount price={price} discount={discount} />
                <Typography color={grey[500]} fontSize="14px" lineHeight="18px">
                    {stock} шт.
                </Typography>
                <Typography
                    fontSize="16px"
                    lineHeight="20px"
                    fontWeight="semibold"
                    height="40px"
                    textOverflow="ellipsis"
                    overflow="hidden"
                >
                    {name}
                </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: 'auto' }}>
                <ProductCartContainer productId={id} stock={stock} />
            </CardActions>
        </Card>
    );
};
