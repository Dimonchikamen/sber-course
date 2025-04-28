import type { AxiosResponse } from 'axios';

import type { ExceptionResponse } from '$models';

export const isExceptionData = <T extends Record<string, unknown> | Array<unknown> | number | string | unknown>(
    data: T | ExceptionResponse
): data is ExceptionResponse => {
    return typeof data === 'object' && data !== null && 'statusCode' in data;
};

export const isApiException = <T extends Record<string, unknown> | Array<unknown> | number | string>(
    response: AxiosResponse<T | ExceptionResponse>
): response is AxiosResponse<ExceptionResponse> => {
    return isExceptionData(response.data);
};
