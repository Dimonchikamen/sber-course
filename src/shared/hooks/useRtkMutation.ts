import { useCallback } from 'react';
import type { PayloadActionCreator } from '@reduxjs/toolkit';
import type { UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition,
} from '@reduxjs/toolkit/query';

import type { ExceptionResponse } from '$models';

import { isExceptionData } from '../lib';

import { useAppDispatch } from './store';

type Callbacks<TSuccess, TException = ExceptionResponse> = {
    onSuccess?: (arg: TSuccess) => void;
    onError?: (arg: TException) => void;
};

type UseRtkMutationOptions<TSuccess, TException = ExceptionResponse> = {
    onSuccessDispatchAction?: PayloadActionCreator<TSuccess>;
    onExceptionDispatchAction?: PayloadActionCreator<TException>;
};

export const useRtkMutation = <TPayload, TResult>(
    useMutation: UseMutation<
        MutationDefinition<
            TPayload,
            BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, EmptyObject, FetchBaseQueryMeta>,
            string | never,
            TResult,
            string
        >
    >,
    options?: UseRtkMutationOptions<TResult>
) => {
    const { onSuccessDispatchAction, onExceptionDispatchAction } = options || {};
    const [executeMutation, data] = useMutation();
    const dispatch = useAppDispatch();

    const execute = useCallback(async (payload: TPayload, callbacks?: Callbacks<TResult>) => {
        const { onSuccess, onError } = callbacks || {};
        const response = await executeMutation(payload);

        if (response.data && isExceptionData(response.data)) {
            if (onExceptionDispatchAction) {
                dispatch(onExceptionDispatchAction(response.data));
            }

            onError?.(response.data);

            return;
        }

        if (response.error) {
            return;
        }

        if (onSuccessDispatchAction) {
            dispatch(onSuccessDispatchAction(response.data));
        }

        onSuccess?.(response.data);
    }, []);

    return [execute, data as typeof data & { error?: ExceptionResponse }] as const;
};
