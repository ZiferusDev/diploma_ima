import { css } from '@emotion/css';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    Typography,
} from '@mui/material';
import { useRef } from 'react';
import {
    useAddIntegrationMutation,
    useImportProjectsMutation,
} from '../store/services/project';
import { useGetCurrentUserQuery } from '../store/services/users';

export const IntegrationDialog = ({
    isOpened,
    onClose,
}: {
    isOpened: boolean;
    onClose: () => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const hubRef = useRef<HTMLInputElement>(null);
    const [gitlabMutation] = useAddIntegrationMutation();
    const { data: currUser } = useGetCurrentUserQuery();
    const [importGitLab, data] = useImportProjectsMutation();

    return (
        <Dialog open={isOpened} onClose={onClose}>
            <DialogTitle>Интегрировать проекты с GitLab\GitHub</DialogTitle>
            <DialogContent>
                <div
                    className={css`
                        padding: 30px;
                        border: 1px solid #000;
                        margin-bottom: 15px;
                    `}
                >
                    <TextField
                        sx={{ margin: '8px' }}
                        className={css`
                            width: 100%;
                        `}
                        helperText="Enter github token"
                        size={'small'}
                        inputRef={hubRef}
                        defaultValue={currUser?.githubToken}
                    />
                </div>
                <div
                    className={css`
                        padding: 30px;
                        border: 1px solid #fc6d26;
                    `}
                >
                    <TextField
                        sx={{ margin: '8px' }}
                        className={css`
                            width: 100%;
                        `}
                        helperText="Enter gitlab token"
                        size={'small'}
                        inputRef={inputRef}
                        defaultValue={currUser?.gitlabToken}
                    />
                    {currUser?.gitlabToken && (
                        <div
                            className={css`
                                display: flex;
                                flex-direction: column;
                                gap: 10px;
                                margin-left: 8px;
                            `}
                        >
                            <Divider />
                            <Typography fontSize={15}>
                                У вас же есть связь с Gitlab, импортировать
                                проекты?
                            </Typography>
                            <Button
                                onClick={async () => {
                                    await importGitLab();
                                    onClose();
                                }}
                                sx={{
                                    width: 'fit-content',
                                    borderColor: '#fc6d26',
                                    color: '#fc6d26',
                                    ':hover': {
                                        backgroundColor: '#fff3ed',
                                    },
                                }}
                                variant="outlined"
                                disabled={data.isLoading}
                            >
                                Импорт{' '}
                                {data.isLoading && (
                                    <CircularProgress
                                        sx={{
                                            marginLeft: '5px',
                                        }}
                                        size={'15px'}
                                        color="inherit"
                                    />
                                )}
                            </Button>
                            <Divider />
                        </div>
                    )}
                </div>
                <DialogActions>
                    <Button
                        disabled={data.isLoading}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        disabled={data.isLoading}
                        sx={{
                            background:
                                'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(252,109,38,1) 100%)',
                        }}
                        variant="contained"
                        onClick={() => {
                            if (!inputRef.current) return;
                            if (!hubRef.current) return;
                            gitlabMutation({
                                lab: inputRef.current.value,
                                hub: hubRef.current.value,
                            });
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
