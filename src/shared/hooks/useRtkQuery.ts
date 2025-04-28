import type { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryDefinition,
} from '@reduxjs/toolkit/query';

import type { ExceptionResponse } from '$models';

type QueryHook<TPayload, TResult> = UseQuery<
    QueryDefinition<
        TPayload,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, EmptyObject, FetchBaseQueryMeta>,
        string | never,
        TResult,
        string
    >
>;

export const useRtkQuery = <TPayload, TResult>(
    useQuery: QueryHook<TPayload, TResult>,
    arg: TPayload,
    options?: { skip?: boolean }
) => {
    const queryReturns = useQuery(arg, options);

    return queryReturns as Omit<typeof queryReturns, 'isSuccess' | 'data' | 'isError' | 'error'> &
        (
            | {
                  isSuccess: true;
                  data: TResult;
                  isError: false;
                  error: undefined;
              }
            | {
                  isSuccess: false;
                  data: undefined;
                  isError: true;
                  error: ExceptionResponse;
              }
        );
};
