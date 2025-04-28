import type { Reducer } from '@reduxjs/toolkit';

import type { authApi, cartApi, productApi, reviewApi } from '$store';

import type { AuthSchema } from './authSchema';
import type { CartSchema } from './cartSchema';
import type { LoginSchema } from './loginSchema';
import type { ModalSchema } from './modalSchema';
import type { UserSchema } from './userSchema';

export type StateSchema = {
    [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
    [productApi.reducerPath]: ReturnType<typeof productApi.reducer>;
    [reviewApi.reducerPath]: ReturnType<typeof reviewApi.reducer>;
    [cartApi.reducerPath]: ReturnType<typeof cartApi.reducer>;
    auth: AuthSchema;
    user: UserSchema;
    modal: ModalSchema;
    cart: CartSchema;
    loginForm?: LoginSchema;
};

export type StateSchemaKey = keyof StateSchema;

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};
