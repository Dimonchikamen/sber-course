import type { FC } from 'react';
import { useCallback } from 'react';
import { Close } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector, useRtkMutation } from '$shared/hooks';
import { Button } from '$shared/ui';
import {
    cartActions,
    cartApi,
    deleteProductFromCartIdSelector,
    updateCartAfterDeleteProduct,
    useDeleteProductFromCartMutation,
} from '$store';

export const DeleteProductFromCartConfirmModal: FC = () => {
    const dispatch = useAppDispatch();
    const productId = useAppSelector(deleteProductFromCartIdSelector);
    const { isLoading } = useAppSelector(cartApi.endpoints.getCartFullProductList.select(undefined));

    const [deleteProductFromCart, { isLoading: isLoadingDelete }] = useRtkMutation(useDeleteProductFromCartMutation);

    const handleCloseModal = useCallback(() => dispatch(cartActions.setDeleteProductFromCartId(null)), []);

    const handleClickDeleteProductFromCart = useCallback(() => {
        deleteProductFromCart(productId!, {
            onSuccess: () => {
                handleCloseModal();
                dispatch(updateCartAfterDeleteProduct(productId!));
            },
        });
    }, [productId]);

    return (
        <Dialog open={Boolean(productId)} fullWidth onClose={handleCloseModal}>
            <DialogTitle display="flex" flexDirection="row" justifyContent="space-between">
                Удаление товара
                <IconButton onClick={handleCloseModal}>
                    <Close sx={{ width: '32px', height: '32px' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography>Удалить выбранный товар? Отменить действие будет невозможно</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseModal}>
                    Отменить
                </Button>
                <Button
                    autoFocus
                    color="error"
                    variant="contained"
                    isLoading={isLoading || isLoadingDelete}
                    onClick={handleClickDeleteProductFromCart}
                >
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
};
