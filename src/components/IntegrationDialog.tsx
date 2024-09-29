import { css } from '@emotion/css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useRef } from 'react';
import { useAddIntegrationMutation } from '../store/services/project';

export const IntegrationDialog = ({
    isOpened,
    onClose,
}: {
    isOpened: boolean;
    onClose: () => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [gitlabMutation] = useAddIntegrationMutation();

    return (
        <Dialog open={isOpened} onClose={onClose}>
            <DialogTitle>Интегрировать проекты с GitLab</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ margin: '8px' }}
                    className={css`
                        width: 100%;
                    `}
                    label="Enter gitlab token"
                    size={'small'}
                    inputRef={inputRef}
                />
                <DialogActions>
                    <Button
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: '#fc6d26',
                        }}
                        variant="contained"
                        onClick={() => {
                            if (!inputRef.current) return;
                            if (!inputRef.current.value.length) return;
                            gitlabMutation(inputRef.current.value);
                            onClose();
                        }}
                    >
                        Интегрировать!
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
