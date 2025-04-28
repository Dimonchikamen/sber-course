import { useCallback, useState } from 'react';
import type { AxiosResponse } from 'axios';

import type { ExceptionResponse } from '$models';

type BaseApi = Record<string, (arg: any) => Promise<AxiosResponse<any | ExceptionResponse>>>;

interface Options {
    onSuccess?: (response: any) => void;
    onException?: (exception: ExceptionResponse) => void;
}

export const useApi = <TApi extends BaseApi>(api: TApi) => {
    const [isLoading, setLoading] = useState(false);
    const [exception, setException] = useState<ExceptionResponse | null>(null);

    const execute = useCallback(
        (
            endpoint: keyof typeof api,
            { payload, onSuccess, onException }: { payload?: Parameters<TApi[typeof endpoint]>[0] } & Options
        ) => {
            api[endpoint](payload)
                .then(res => {
                    if ('statusCode' in res.data) {
                        setException(res.data);
                        onException?.(res.data);
                    } else {
                        setException(null);
                        onSuccess?.(res.data);
                    }
                })
                .finally(() => setLoading(false));
        },
        [api]
    );

    return {
        isLoading,
        exception,
        execute,
    };
};
