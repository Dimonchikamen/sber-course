import type { MouseEvent } from 'react';
import { memo, useCallback } from 'react';

import { useAppDispatch, useAppSelector, useRtkMutation } from '$shared/hooks';
import { Button } from '$shared/ui';
import { isAuthSelector, modalActions, updateCartAfterAddProduct, useAddProductToCartMutation } from '$store';

interface AddToCartButtonProps {
    productId: string;
    disabled?: boolean;
}

export const AddToCartButton = memo(({ productId, disabled }: AddToCartButtonProps) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthSelector);
    const [addToCart, { isLoading }] = useRtkMutation(useAddProductToCartMutation);

    const handleAddToCartClick = useCallback(
        (ev: MouseEvent<HTMLButtonElement>) => {
            ev.stopPropagation();
            ev.preventDefault();

            if (!isAuth) {
                dispatch(modalActions.openModal('LOGIN_MODAL'));

                return;
            }

            addToCart(productId, {
                onSuccess: () => {
                    dispatch(updateCartAfterAddProduct(productId));
                },
            });
        },
        [productId]
    );

    return (
        <Button
            variant="outlined"
            sx={{ fontSize: '16px', lineHeightL: '20px', fontWeight: 'semibold', width: '124px' }}
            disabled={disabled}
            isLoading={isLoading}
            onClick={handleAddToCartClick}
        >
            В корзину
        </Button>
    );
});
