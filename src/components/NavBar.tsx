import { css } from '@emotion/css';
import {
    CircularProgress,
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
import {
    useCreateProjectMutation,
    useGetProjectsQuery,
} from '../store/services/project';

export const NavBar = () => {
    const theme = useTheme();
    const inputNameRef = useRef<HTMLInputElement>(null);
    const [createProject, data] = useCreateProjectMutation();

    const onClickhandler = () => {
        if (inputNameRef.current === null) return;
        if (data.isLoading) return;

        createProject(inputNameRef.current.value);
    };

    const { data: projects, isFetching, isLoading } = useGetProjectsQuery();

    return (
        <div
            className={css`
                max-width: 320px;
                border-right: solid 1px ${theme.palette.divider};
                height: 100vh;
                overflow: scroll;
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
                        inputRef={inputNameRef}
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
                    <Divider />
                    {isFetching || isLoading ? (
                        <CircularProgress />
                    ) : (
                        projects?.map(project => {
                            return (
                                <div key={project.id}>
                                    <ListItemText
                                        primary={project.name}
                                        key={project.id}
                                    />
                                    <List>
                                        <ListItemButton>
                                            <ListItemText
                                                primary={'Участники'}
                                            />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText primary={'Задачи'} />
                                        </ListItemButton>
                                    </List>
                                </div>
                            );
                        })
                    )}
                </List>
            </div>
        </div>
    );
};
