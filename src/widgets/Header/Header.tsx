import type { FC } from 'react';
import { AppBar, Container, Link, Stack, Toolbar } from '@mui/material';

import { FavoriteProductListBlock, ProfileBlock } from '$components';
import { CartIconContainer } from '$components/CartIconContainer';
import { LogoIcon } from '$shared/ui';

export const Header: FC = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Link underline="none" href="/">
                        <LogoIcon color="white" />
                    </Link>
                    <Stack direction="row" alignItems="center" gap={2}>
                        <CartIconContainer />
                        <FavoriteProductListBlock />
                        <ProfileBlock />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
