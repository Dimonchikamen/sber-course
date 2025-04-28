import type { ComponentType, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ACCESS_TOKEN_KEY } from '$shared/const';
import { useAppSelector } from '$shared/hooks';
import { publicRoutePaths } from '$shared/routes';
import { isAuthSelector } from '$store';

export const WithProtection = <TProps extends Record<string, unknown>>(Component: ComponentType<TProps>) => {
    const WrapperComponent: FC<TProps> = props => {
        const isAuth = useAppSelector(isAuthSelector);
        const location = useLocation();

        if (!isAuth && !localStorage.getItem(ACCESS_TOKEN_KEY)) {
            return <Navigate to={publicRoutePaths.login} state={{ from: location.pathname }} />;
        }

        return <Component {...props} />;
    };

    return WrapperComponent;
};
