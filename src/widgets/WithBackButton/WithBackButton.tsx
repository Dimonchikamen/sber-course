import type { FC, ReactNode } from 'react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import type { StackProps } from '@mui/material';
import { Button, Stack } from '@mui/material';

import { publicRoutePaths } from '$shared/routes';

type WithBackButtonProps = Omit<StackProps, 'gap' | 'width' | 'direction'> & {
    defaultUrl?: string;
    ignoreState?: boolean;
    contentNearButton?: ReactNode;
    children: ReactNode;
};

export const WithBackButton: FC<WithBackButtonProps> = ({
    defaultUrl = publicRoutePaths.products,
    ignoreState = false,
    contentNearButton,
    children,
    ...stackProps
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = useCallback(() => {
        if (!ignoreState && location.state) {
            navigate(-1);
        } else {
            navigate(defaultUrl);
        }
    }, [location.state, defaultUrl, ignoreState]);

    return (
        <Stack gap={1} width="100%" {...stackProps}>
            <Stack direction="row" alignItems="center" gap={2}>
                <Button
                    startIcon={<ChevronLeft />}
                    size="large"
                    sx={{ width: 'fit-content' }}
                    onClick={handleBackClick}
                >
                    Назад
                </Button>
                {contentNearButton}
            </Stack>
            {children}
        </Stack>
    );
};
