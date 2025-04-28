import type { FC } from 'react';
import { useCallback } from 'react';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import { LoginForm } from '$components/forms';
import { useAppDispatch, useAppSelector } from '$shared/hooks';
import { modalActions, modalStateSelector } from '$store';

export const LoginModal: FC = () => {
    const dispatch = useAppDispatch();
    const { LOGIN_MODAL } = useAppSelector(modalStateSelector);

    const handleClose = useCallback(() => dispatch(modalActions.closeModal('LOGIN_MODAL')), []);

    const handleNavigateToRegister = useCallback(() => {
        handleClose();
        dispatch(modalActions.openModal('REGISTER_MODAL'));
    }, []);

    return (
        <Dialog open={LOGIN_MODAL} fullWidth onClose={handleClose}>
            <DialogTitle display="flex" flexDirection="row" justifyContent="end">
                <IconButton onClick={handleClose}>
                    <Close sx={{ width: '32px', height: '32px' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <LoginForm onSuccessSubmit={handleClose} onNavigateToRegisterClick={handleNavigateToRegister} />
            </DialogContent>
        </Dialog>
    );
};
