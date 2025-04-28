import type { FC } from 'react';
import { useCallback } from 'react';
import { Stack } from '@mui/material';

import { CartProductItem, CartProductItemSkeleton, DeleteProductFromCartConfirmModal } from '$components';
import { useAppDispatch, useAppSelector } from '$shared/hooks';
import { cartActions, cartApi } from '$store';

export const CartProductList: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, data: { products = [] } = {} } = useAppSelector(
        cartApi.endpoints.getCartFullProductList.select(undefined)
    );

    const handleDeleteProductFromCartClick = useCallback(
        (id: string) => dispatch(cartActions.setDeleteProductFromCartId(id)),
        []
    );

    if (isLoading) {
        return (
            <Stack gap={1}>
                <CartProductItemSkeleton />
                <CartProductItemSkeleton />
                <CartProductItemSkeleton />
            </Stack>
        );
    }

    return (
        <Stack gap={1}>
            {products!.map(({ product }) => (
                <CartProductItem key={product.id} product={product} onClickDelete={handleDeleteProductFromCartClick} />
            ))}
            <DeleteProductFromCartConfirmModal />
        </Stack>
    );
};
