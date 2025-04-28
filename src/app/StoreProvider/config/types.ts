import type { NavigateOptions, To } from 'react-router';
import type { AxiosInstance } from 'axios';

import type { StateSchema } from '$models';

export type ThunkExtraArg = {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
};

export type ThunkConfig<T> = {
    state: StateSchema;
    rejectValue: T;
    extra: ThunkExtraArg;
};
