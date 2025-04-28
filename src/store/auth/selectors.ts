import type { StateSchema } from '$models';

export const isAuthSelector = (state: StateSchema) => state.auth.isAuth;
export const authUserSelector = (state: StateSchema) => state.auth.user;

export const authSelector = (state: StateSchema) => state.auth;
