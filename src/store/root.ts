import type { NavigateOptions, To } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import type { StateSchema } from '$models';
import { baseApi } from '$shared/api';

import { authApi, authReducer } from './auth';
import { cartApi, cartReducer } from './cart';
import { modalReducer } from './modal';
import { productApi } from './product';
import { reviewApi } from './review';
import { userReducer } from './user';

export function createReduxStore(initialState?: StateSchema, navigate?: (to: To, options?: NavigateOptions) => void) {
    const store = configureStore<StateSchema>({
        reducer: combineReducers({
            [authApi.reducerPath]: authApi.reducer,
            [productApi.reducerPath]: productApi.reducer,
            [reviewApi.reducerPath]: reviewApi.reducer,
            [cartApi.reducerPath]: cartApi.reducer,
            auth: authReducer,
            user: userReducer,
            modal: modalReducer,
            cart: cartReducer,
        }),
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: baseApi,
                        navigate,
                    },
                },
            }).concat([authApi.middleware, productApi.middleware, reviewApi.middleware, cartApi.middleware]),
    });

    return store;
}
