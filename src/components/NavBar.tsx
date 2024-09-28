import { css } from '@emotion/css';
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import { CircleCheckBig, Inbox, User } from 'lucide-react';
import Logo from '../assests/logo2.svg?react';
import { useState } from 'react';
import {
    useCreateProjectMutation,
    useGetProjectsQuery,
} from '../store/services/project';
import { ProjectDialog } from './ProjectDialog';

export const NavBar = () => {
    const theme = useTheme();
    const [_, data] = useCreateProjectMutation();
    const [isProjectDialogOpened, setProjectDialogOpened] =
        useState<boolean>(false);

    const buttons = [
        <Button
            key="first"
            className={css`
                display: flex;
                gap: 5px;
            `}
        >
            <Inbox size={20} />
            <Typography>Сообщения</Typography>
        </Button>,
        <Button
            key="second"
            className={css`
                display: flex;
                gap: 5px;
            `}
        >
            {' '}
            <CircleCheckBig size={20} />
            <Typography>Мои задачи</Typography>
        </Button>,
    ];

    const { data: projects, isFetching, isLoading } = useGetProjectsQuery();

    return (
        <div>
            <ProjectDialog
                isOpened={isProjectDialogOpened}
                onClose={() => {
                    if (data.isLoading) return;
                    setProjectDialogOpened(false);
                }}
            />
            <div
                className={css`
                    max-width: 400px;
                    border-right: solid 1px ${theme.palette.divider};
                    height: 100vh;
                    overflow: scroll;
                    overflow-y: scroll;
                    position: relative;
                `}
            >
                <ButtonGroup
                    className={css`
                        position: absolute;
                        top: 140px;
                        left: 230px;
                    `}
                    orientation="vertical"
                    size="small"
                    color="inherit"
                    variant="text"
                >
                    {buttons}
                </ButtonGroup>
                <div
                    className={css`
                        display: flex;
                        padding-bottom: 20px;
                    `}
                >
                    <Logo />
                </div>
                <Divider />
                <div
                    className={css`
                        width: 80%;
                        margin: 0 auto;
                        border-radius: 25px;
                        margin-top: 5px;
                        padding: 5px;
                    `}
                >
                    <List>
                        <Button
                            onClick={() => {
                                setProjectDialogOpened(true);
                            }}
                            variant="contained"
                            sx={{
                                marginBottom: '10px',
                            }}
                            color="secondary"
                            disableElevation
                        >
                            Создать проект
                        </Button>

                        {isFetching || isLoading ? (
                            <CircularProgress />
                        ) : (
                            projects?.map((project, index) => {
                                return (
                                    <div key={project.id}>
                                        <div
                                            className={css`
                                                border: 1px solid black;
                                                border-radius: 12px;
                                                padding: 5px;
                                                display: flex;
                                                align-items: center;
                                                gap: 16px;
                                            `}
                                            key={project.id}
                                        >
                                            <div
                                                className={css`
                                                    border-radius: 9999px;
                                                    min-height: 40px;
                                                    min-width: 40px;
                                                    max-width: 40px;
                                                    max-height: 40px;
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                    background-color: ${theme
                                                        .palette.primary.light};
                                                `}
                                            >
                                                <Typography color="info">
                                                    {index + 1}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="body1">{`Проект №${index + 1}`}</Typography>
                                                <Typography
                                                    color="gray"
                                                    variant="subtitle2"
                                                >
                                                    {project.name}
                                                </Typography>
                                            </div>
                                        </div>
                                        <List
                                            className={css`
                                                display: flex;
                                                flex-direction: column;
                                                align-items: end;
                                                gap: 10px;
                                            `}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette.primary
                                                            .main,
                                                    borderRadius: '12px',
                                                    color: '#FFF',
                                                    ':hover': {
                                                        bgcolor:
                                                            theme.palette
                                                                .primary.light,
                                                    },
                                                }}
                                                className={css`
                                                    display: flex;
                                                    justify-content: start;
                                                    background-color: ${theme
                                                        .palette.primary.main};
                                                    width: 60%;
                                                    border-radius: 12px;
                                                    gap: 5px;
                                                `}
                                            >
                                                <User size={20} />
                                                <ListItemText
                                                    primary={'Участники'}
                                                />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette.primary
                                                            .main,
                                                    borderRadius: '12px',
                                                    color: '#FFF',
                                                    ':hover': {
                                                        bgcolor:
                                                            theme.palette
                                                                .primary.light,
                                                    },
                                                }}
                                                className={css`
                                                    display: flex;
                                                    justify-content: start;
                                                    background-color: ${theme
                                                        .palette.primary.main};
                                                    width: 60%;
                                                    border-radius: 12px;
                                                    gap: 5px;
                                                `}
                                            >
                                                <CircleCheckBig size={20} />
                                                <ListItemText
                                                    primary={'Задачи'}
                                                />
                                            </ListItemButton>
                                        </List>
                                    </div>
                                );
                            })
                        )}
                    </List>
                </div>
            </div>
        </div>
    );
};
