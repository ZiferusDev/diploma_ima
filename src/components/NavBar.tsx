import { css } from '@emotion/css';
import {
    Divider,
    Input,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { CircleCheckBig, Inbox, Plus } from 'lucide-react';
import Logo from '../assests/logo2.svg?react';
import { useRef } from 'react';
import { useCreateProjectMutation } from '../store/services/project';

export const NavBar = () => {
    const theme = useTheme();
    const inputNameRef = useRef<HTMLInputElement>(null);
    const [createProject, data] = useCreateProjectMutation();

    const onClickhandler = () => {
        if (inputNameRef.current === null) return;
        if (data.isLoading) return;
        createProject(inputNameRef.current.value);
    };

    return (
        <div
            className={css`
                max-width: 320px;
                border-right: solid 1px ${theme.palette.divider};
                height: 100vh;
            `}
        >
            <div
                className={css`
                    display: flex;
                `}
            >
                <Logo />
            </div>
            <div>
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <Inbox></Inbox>
                        </ListItemIcon>
                        <ListItemText primary="Мои сообщения" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            {' '}
                            <CircleCheckBig />
                        </ListItemIcon>

                        <ListItemText primary="Мои задачи" />
                    </ListItemButton>
                    <Divider />
                    <TextField
                        ref={inputNameRef}
                        size={'small'}
                        label={'Введите название проекта'}
                        className={css`
                            width: 100%;
                        `}
                        variant={'standard'}
                    />
                    <ListItemButton onClick={onClickhandler}>
                        <ListItemIcon>
                            <Plus />
                        </ListItemIcon>
                        <ListItemText primary="Создать проект" />
                    </ListItemButton>
                </List>
            </div>
        </div>
    );
};
