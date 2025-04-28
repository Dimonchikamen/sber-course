import type { FC } from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import type { ExceptionResponse } from '$models';

interface ExceptionBlockProps {
    exception: ExceptionResponse;
    onRepeat?: VoidFunction;
}

export const ExceptionBlock: FC<ExceptionBlockProps> = ({ exception, onRepeat }) => {
    return (
        <Stack direction="column" alignItems="center" justifyContent="center" width="100%">
            <ErrorOutline />
            <Typography>code: {exception.statusCode}</Typography>
            <Typography>{exception.message}</Typography>
            {onRepeat && (
                <Button variant="outlined" onClick={onRepeat}>
                    Повторить
                </Button>
            )}
        </Stack>
    );
};
