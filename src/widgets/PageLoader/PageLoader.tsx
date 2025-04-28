import type { FC } from 'react';
import { CircularProgress, Stack } from '@mui/material';

export const PageLoader: FC = () => {
    return (
        <Stack alignItems="center" justifyContent="center" width="100%" height="100%">
            <CircularProgress size={96} />
        </Stack>
    );
};
