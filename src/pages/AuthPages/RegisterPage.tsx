import type { FC } from 'react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RegisterForm } from '$components';
import { publicRoutePaths } from '$shared/routes';
import { WithBackButton } from '$widgets';

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigateToTargetPage = useCallback(
        () => navigate(location.state?.from ?? publicRoutePaths.products),
        [location.state?.from]
    );

    const handleNavigateToLogin = useCallback(() => navigate(publicRoutePaths.login), []);

    return (
        <WithBackButton ignoreState marginLeft="auto" marginRight="auto" sx={{ maxWidth: '940px' }}>
            <RegisterForm onSuccessSubmit={handleNavigateToTargetPage} onNavigateToLoginClick={handleNavigateToLogin} />
        </WithBackButton>
    );
};
