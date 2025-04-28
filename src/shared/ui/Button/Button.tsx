import type { CSSProperties, FC } from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
    isLoading?: boolean;
}

const progressSizes: Record<NonNullable<ButtonProps['size']>, Pick<CSSProperties, 'width' | 'height'>> = {
    small: { width: '22px', height: '22px' },
    medium: { width: '24px', height: '24px' },
    large: { width: '26px', height: '26px' },
};

export const Button: FC<ButtonProps> = ({ isLoading, disabled, children, size = 'medium', ...props }) => {
    return (
        <MuiButton {...props} size={size} disabled={isLoading || disabled}>
            {isLoading ? <CircularProgress style={progressSizes[size]} color="inherit" /> : children}
        </MuiButton>
    );
};
