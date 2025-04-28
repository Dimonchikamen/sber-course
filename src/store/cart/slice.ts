import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { CartSchema } from '$models';

const initialState: CartSchema = {
    deleteProductFromCartId: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setDeleteProductFromCartId(state, action: PayloadAction<string | null>) {
            state.deleteProductFromCartId = action.payload;
        },
    },
});

export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
