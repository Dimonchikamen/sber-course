import { createSelector } from '@reduxjs/toolkit';

import type { StateSchema } from '$models';

import { cartApi } from './api';

export const cartProductCountByIdSelector = (id: string) =>
    createSelector(
        cartApi.endpoints.getCartShortProductList.select(undefined),
        shortProducts => shortProducts.data?.products?.find(product => product.id === id)?.count || 0
    );

export const deleteProductFromCartIdSelector = (state: StateSchema) => state.cart.deleteProductFromCartId;
