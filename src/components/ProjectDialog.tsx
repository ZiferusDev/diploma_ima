import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useCreateProjectMutation } from '../store/services/project';
import { css } from '@emotion/css';
import { useGetUsersQuery } from '../store/services/users';

export const ProjectDialog = ({
    isOpened,
    onClose,
}: {
    isOpened: boolean;
    onClose: () => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [createProject, _] = useCreateProjectMutation();
    const { data: users, isFetching, isLoading } = useGetUsersQuery();
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <Dialog open={isOpened} onClose={onClose}>
            <DialogTitle>Создать новый проект</DialogTitle>
            <DialogContent>
                <div
                    className={css`
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    `}
                >
                    <TextField size={'small'} inputRef={inputRef} />
                    <Select
                        size="small"
                        multiple
                        value={selected}
                        id="Select-users"
                    >
                        {isLoading || isFetching ? (
                            <MenuItem>Loading...</MenuItem>
                        ) : (
                            users?.map(user => {
                                return (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.fullName}
                                    </MenuItem>
                                );
                            })
                        )}
                    </Select>
                </div>
                <DialogActions>
                    <Button
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (!inputRef.current) return;
                            createProject(inputRef.current?.value);
                            onClose();
                        }}
                    >
                        Создать проект
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
