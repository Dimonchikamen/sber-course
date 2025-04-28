import axios from 'axios';

import { ACCESS_TOKEN_KEY, API_URL } from '$shared/const';

const baseApi = axios.create({
    withCredentials: true,
    baseURL: API_URL, //TODO: url брать из env
});

baseApi.interceptors.request.use(config => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    config.headers['Access-Control-Allow-Credentials'] = true;
    config.headers.Authorization = token;

    return config;
});

baseApi.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        const originalRequest = error.config;
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (!error.response) {
            return;
        }

        if (error.response.status >= 400 && (!token || error.response.status !== 401)) {
            return error.response;
        }

        if (error.response.status === 401 && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response: any = await axios({
                    method: 'GET',
                    url: `${baseApi.defaults.url}/auth/refresh-tokens`,
                    withCredentials: true,
                });

                localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);

                return await baseApi.request(originalRequest);
            } catch (internalError) {
                console.error(internalError);
            }
        }

        if (error.response.status === 401 && error.config?._isRetry) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
    }
);

export { baseApi };
