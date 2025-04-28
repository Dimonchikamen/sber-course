import type { FC } from 'react';
import { useCallback } from 'react';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import { RegisterForm } from '$components/forms';
import { useAppDispatch, useAppSelector } from '$shared/hooks';
import { modalActions, modalStateSelector } from '$store';

export const RegisterModal: FC = () => {
    const dispatch = useAppDispatch();
    const { REGISTER_MODAL } = useAppSelector(modalStateSelector);

    const handleClose = useCallback(() => dispatch(modalActions.closeModal('REGISTER_MODAL')), []);

    const handleNavigateToLogin = useCallback(() => {
        handleClose();
        dispatch(modalActions.openModal('LOGIN_MODAL'));
    }, []);

    return (
        <Dialog open={REGISTER_MODAL} fullWidth onClose={handleClose}>
            <DialogTitle display="flex" flexDirection="row" justifyContent="end">
                <IconButton onClick={handleClose}>
                    <Close sx={{ width: '32px', height: '32px' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <RegisterForm onSuccessSubmit={handleClose} onNavigateToLoginClick={handleNavigateToLogin} />
            </DialogContent>
        </Dialog>
    );
};
