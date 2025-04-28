import type { ModalSchema, StateSchema } from '$models';

export const modalStateSelector = (state: StateSchema) => state.modal;

export const modalOpenSelector = (modal: keyof ModalSchema) => (state: StateSchema) => state.modal[modal];
