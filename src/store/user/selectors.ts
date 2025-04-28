import type { StateSchema } from '$models';

export const isLoadingUserSelector = (state: StateSchema) => state.user.isLoading;
export const userDataSelector = (state: StateSchema) => state.user.user;
export const userExceptionSelector = (state: StateSchema) => state.user.exception;

export const userSelector = (state: StateSchema) => state.user;
