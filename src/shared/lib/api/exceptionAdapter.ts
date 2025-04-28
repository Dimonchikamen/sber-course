import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import type { ExceptionResponse } from '$models';

export const exceptionAdapter = (error: FetchBaseQueryError): ExceptionResponse => {
    if (typeof error.status === 'number') {
        return error.data as ExceptionResponse;
    } else {
        return {
            error: error.status,
            message: error.error,
            statusCode: 0,
        };
    }
};
