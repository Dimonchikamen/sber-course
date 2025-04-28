import type { FC, MouseEvent } from 'react';
import { useCallback } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Button, CircularProgress, IconButton } from '@mui/material';

import { useAppDispatch, useAppSelector, useRtkMutation } from '$shared/hooks';
import {
    isAuthSelector,
    modalActions,
    updateProductLikes,
    useAddProductLikeMutation,
    userActions,
    useRemoveProductLikeMutation,
} from '$store';

interface ProductCardFavoriteProps {
    productId: string;
    isFavorite: boolean;
    label?: string;
}

export const ProductFavorite: FC<ProductCardFavoriteProps> = ({ productId, isFavorite, label }) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthSelector);
    const [addProductLike, { isLoading: isAddLoading }] = useRtkMutation(useAddProductLikeMutation);
    const [removeProductLike, { isLoading: isRemoveLoading }] = useRtkMutation(useRemoveProductLikeMutation);

    const isLoading = isAddLoading || isRemoveLoading;

    const FavoriteIcon = isFavorite ? Favorite : FavoriteBorder;

    const handleAddToFavoriteClick = useCallback(
        (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();

            if (!isAuth) {
                dispatch(modalActions.openModal('LOGIN_MODAL'));

                return;
            }

            const action = isFavorite ? removeProductLike : addProductLike;
            const successAction = isFavorite ? userActions.removeUserLike : userActions.addUserLike;
            action(productId, {
                onSuccess: res => {
                    const like = 'like' in res ? res.like : res.product;
                    dispatch(successAction(like));
                    dispatch(updateProductLikes(productId));
                },
            });
        },
        [isFavorite, isAuth, productId]
    );

    const children = isLoading ? <CircularProgress size={24} /> : <FavoriteIcon />;

    if (label) {
        return (
            <Button
                disabled={isLoading}
                startIcon={children}
                sx={{ width: 'fit-content' }}
                onClick={handleAddToFavoriteClick}
            >
                {label}
            </Button>
        );
    }

    return (
        <IconButton disabled={isLoading} onClick={handleAddToFavoriteClick}>
            {children}
        </IconButton>
    );
};
