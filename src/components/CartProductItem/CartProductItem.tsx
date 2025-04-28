import type { FC } from 'react';
import { useCallback } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import type { Product } from '$models';

import { PriceWithDiscount } from '../PriceWithDiscount';
import { ProductCartContainer } from '../ProductCartContainer';

interface CartProductItemProps {
    product: Product;
    onClickDelete: (id: string) => void;
}

export const CartProductItem: FC<CartProductItemProps> = ({
    product: { id, stock, price, discount, name, images },
    onClickDelete,
}) => {
    const handleDeleteProductClick = useCallback(() => onClickDelete(id), [id, onClickDelete]);

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            border="1px solid"
            borderRadius={3}
            borderColor={grey[300]}
            padding={2}
            gap={2}
        >
            <Stack alignItems="center" direction="row" gap={2}>
                <img src={images} width="80px" />
                <Stack gap={1}>
                    <Typography fontSize="16px" lineHeight="18px">
                        {name}
                    </Typography>
                    <ProductCartContainer
                        productId={id}
                        stock={stock}
                        counterSize="small"
                        onRemoveLastProductCustomHandler={handleDeleteProductClick}
                    />
                </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
                <PriceWithDiscount
                    price={price}
                    discount={discount}
                    typography="24_28"
                    enableFullPricePadding={false}
                />
                <IconButton onClick={handleDeleteProductClick}>
                    <Delete />
                </IconButton>
            </Stack>
        </Stack>
    );
};
