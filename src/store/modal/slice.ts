import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ModalSchema } from '$models';

const initialState: ModalSchema = {
    LOGIN_MODAL: false,
    REGISTER_MODAL: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<keyof ModalSchema>) {
            state[action.payload] = true;
        },
        closeModal(state, action: PayloadAction<keyof ModalSchema>) {
            state[action.payload] = false;
        },
        setModalState(state, action: PayloadAction<{ modal: keyof ModalSchema; value: ValueOf<ModalSchema> }>) {
            state[action.payload.modal] = action.payload.value;
        },
    },
});

export const { actions: modalActions } = modalSlice;
export const { reducer: modalReducer } = modalSlice;
