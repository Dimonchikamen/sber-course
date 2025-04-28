import type { FC, ReactNode } from 'react';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import { LoginModal, RegisterModal } from '$components';
import { useAppDispatch } from '$shared/hooks';
import { authActions } from '$store';
import { Footer, Header, PageLoader } from '$widgets';

interface AppLayoutProps {
    children?: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authActions.checkAuth());
    }, []);

    return (
        <>
            <Header />
            <Container
                component="main"
                sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    display: 'flex',
                    flex: 1,
                    minHeight: 'calc(100dvh - 64px - 194px)',
                }}
            >
                <Suspense fallback={<PageLoader />}>{children || <Outlet />}</Suspense>
            </Container>
            <Footer />
            <RegisterModal />
            <LoginModal />
        </>
    );
};
