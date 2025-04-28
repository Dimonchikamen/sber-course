import type { FC } from 'react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoginForm } from '$components';
import { publicRoutePaths } from '$shared/routes';
import { WithBackButton } from '$widgets';

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigateToTargetPage = useCallback(
        () => navigate(location.state?.from ?? publicRoutePaths.products),
        [location.state?.from]
    );

    const handleNavigateToRegister = useCallback(() => navigate(publicRoutePaths.register), []);

    return (
        <WithBackButton ignoreState marginLeft="auto" marginRight="auto" sx={{ maxWidth: '940px' }}>
            <LoginForm
                onSuccessSubmit={handleNavigateToTargetPage}
                onNavigateToRegisterClick={handleNavigateToRegister}
            />
        </WithBackButton>
    );
};
