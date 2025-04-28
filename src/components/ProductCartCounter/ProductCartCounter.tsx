import type { MouseEvent } from 'react';
import { memo, useCallback } from 'react';
import { Add, Remove } from '@mui/icons-material';
import type { IconButtonProps } from '@mui/material';
import { CircularProgress, IconButton, Stack, Typography } from '@mui/material';

import { useAppDispatch, useRtkMutation } from '$shared/hooks';
import {
    updateCartAfterAddProduct,
    updateCartAfterRemoveProduct,
    useAddProductToCartMutation,
    useRemoveProductFromCartMutation,
} from '$store';

interface ProductCartCounterProps {
    productId: string;
    count: number;
    disableAdd?: boolean;
    size?: IconButtonProps['size'];
    onRemoveLastProductCustomHandler?: (id: string) => void;
}

export const ProductCartCounter = memo(
    ({ productId, count, disableAdd, size, onRemoveLastProductCustomHandler }: ProductCartCounterProps) => {
        const dispatch = useAppDispatch();
        const [addToCart, { isLoading: isLoadingAdd }] = useRtkMutation(useAddProductToCartMutation);
        const [removeFromCart, { isLoading: isLoadingRemove }] = useRtkMutation(useRemoveProductFromCartMutation);

        const isLoading = isLoadingAdd || isLoadingRemove;

        const stopPropagation = useCallback((ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
        }, []);

        const handleRemoveFromCart = useCallback(() => {
            if (count === 1 && onRemoveLastProductCustomHandler) {
                onRemoveLastProductCustomHandler(productId);

                return;
            }

            removeFromCart(productId, {
                onSuccess: () => {
                    dispatch(updateCartAfterRemoveProduct(productId));
                },
            });
        }, [count, productId]);

        const handleAddToCart = useCallback(
            () =>
                addToCart(productId, {
                    onSuccess: () => {
                        dispatch(updateCartAfterAddProduct(productId));
                    },
                }),
            [productId]
        );

        return (
            <Stack
                direction="row"
                alignItems="center"
                borderRadius="100px"
                width="fit-content"
                border="1px solid #CFD8DC"
                onClick={stopPropagation}
            >
                <IconButton size={size} onClick={handleRemoveFromCart}>
                    <Remove />
                </IconButton>
                <Typography width="20px" textAlign="center">
                    {isLoading ? <CircularProgress size="20px" /> : count}
                </Typography>
                <IconButton size={size} disabled={disableAdd} onClick={handleAddToCart}>
                    <Add />
                </IconButton>
            </Stack>
        );
    }
);
