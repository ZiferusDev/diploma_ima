import { css } from '@emotion/css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    ButtonGroup,
    CircularProgress,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import {
    ArrowDown,
    CircleCheckBig,
    GitlabIcon,
    Inbox,
    Plus,
    User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    useCreateProjectMutation,
    useGetProjectsQuery,
} from '../store/services/project';
import { ProjectDialog } from './ProjectDialog';
import { useNavigate } from 'react-router-dom';
import { IntegrationDialog } from './IntegrationDialog';

export const NavBar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [_, data] = useCreateProjectMutation();
    const [isProjectDialogOpened, setProjectDialogOpened] =
        useState<boolean>(false);
    const [isGitDialog, setGitDialog] = useState(false);

    const buttons = [
        <Button
            sx={{
                textTransform: 'none',
                paddingLeft: 0,
            }}
            key="first"
            className={css`
                display: flex;
                gap: 5px;
            `}
        >
            <Inbox
                size={16}
                className={css`
                    margin-left: -4px;
                `}
            />
            <Typography>Сообщения</Typography>
        </Button>,
        <Button
            sx={{
                textTransform: 'none',
                paddingLeft: 0,
            }}
            key="second"
            className={css`
                display: flex;
                gap: 5px;
            `}
        >
            {' '}
            <CircleCheckBig size={16} />
            <Typography>Мои задачи</Typography>
        </Button>,
    ];

    const { data: projects, isFetching, isLoading } = useGetProjectsQuery();

    return (
        <div>
            <IntegrationDialog
                isOpened={isGitDialog}
                onClose={() => {
                    setGitDialog(false);
                }}
            />
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
                    min-width: 400px;
                    border-right: solid 1px ${theme.palette.divider};
                    height: calc(100vh - 60px);
                    overflow: scroll;
                    overflow-y: scroll;
                    position: relative;
                `}
            >
                <div
                    className={css`
                        padding-left: 64px;
                        padding-right: 64px;
                        padding-top: 42px;
                    `}
                >
                    <Typography variant="h5" color="primary" fontWeight={500}>
                        Моё пространство
                    </Typography>
                    <ButtonGroup
                        className={css``}
                        orientation="vertical"
                        size="small"
                        color="inherit"
                        variant="text"
                    >
                        {buttons}
                    </ButtonGroup>
                </div>
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
                        <div
                            className={css`
                                display: flex;
                                width: 100%;
                                justify-content: center;
                                align-items: center;
                                gap: 5px;
                            `}
                        >
                            <IconButton
                                onClick={() => {
                                    setGitDialog(true);
                                }}
                                sx={{
                                    marginBottom: '10px',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                }}
                            >
                                <GitlabIcon color="#fc6d26" size={16} />
                            </IconButton>
                            <Button
                                onClick={() => {
                                    setProjectDialogOpened(true);
                                }}
                                variant="outlined"
                                sx={{
                                    marginBottom: '10px',
                                    textTransform: 'none',
                                    padding: '4px 16px',
                                    borderRadius: '12px',
                                }}
                                disableElevation
                            >
                                <Plus
                                    className={css`
                                        margin-right: 12px;
                                    `}
                                />
                                Создать проект
                            </Button>
                        </div>
                        <div
                            className={css`
                                display: flex;
                                flex-direction: column;
                                gap: 10px;
                            `}
                        >
                            {isFetching || isLoading ? (
                                <CircularProgress />
                            ) : (
                                projects?.map((project, index) => {
                                    return (
                                        <div key={project.id}>
                                            <Accordion
                                                elevation={0}
                                                className={css`
                                                    border-bottom: 1px solid
                                                        ${theme.palette.divider};
                                                    padding: 5px;
                                                `}
                                                key={project.id}
                                            >
                                                <AccordionSummary
                                                    className={css`
                                                        width: 100%;
                                                    `}
                                                    id={project.id}
                                                    expandIcon={<ArrowDown />}
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
                                                                .palette.primary
                                                                .light};
                                                            margin-right: 12px;
                                                        `}
                                                    >
                                                        <Typography color="#FFF">
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
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <List
                                                        className={css`
                                                            display: flex;
                                                            flex-direction: column;
                                                            align-items: end;
                                                            gap: 10px;
                                                        `}
                                                    >
                                                        <ListItemButton
                                                            onClick={() => {
                                                                navigate(
                                                                    `users?projectid=${project.id}`,
                                                                );
                                                            }}
                                                            sx={{
                                                                backgroundColor:
                                                                    theme
                                                                        .palette
                                                                        .primary
                                                                        .main,
                                                                borderRadius:
                                                                    '12px',
                                                                color: '#FFF',
                                                                ':hover': {
                                                                    bgcolor:
                                                                        theme
                                                                            .palette
                                                                            .primary
                                                                            .light,
                                                                },
                                                            }}
                                                            className={css`
                                                                display: flex;
                                                                justify-content: start;
                                                                background-color: ${theme
                                                                    .palette
                                                                    .primary
                                                                    .main};
                                                                width: 60%;
                                                                border-radius: 12px;
                                                                gap: 5px;
                                                            `}
                                                        >
                                                            <User size={20} />
                                                            <ListItemText
                                                                primary={
                                                                    'Участники'
                                                                }
                                                            />
                                                        </ListItemButton>
                                                        <ListItemButton
                                                            onClick={() => {
                                                                navigate(
                                                                    `tasks?projectid=${project.id}`,
                                                                );
                                                            }}
                                                            sx={{
                                                                backgroundColor:
                                                                    theme
                                                                        .palette
                                                                        .primary
                                                                        .main,
                                                                borderRadius:
                                                                    '12px',
                                                                color: '#FFF',
                                                                ':hover': {
                                                                    bgcolor:
                                                                        theme
                                                                            .palette
                                                                            .primary
                                                                            .light,
                                                                },
                                                            }}
                                                            className={css`
                                                                display: flex;
                                                                justify-content: start;
                                                                background-color: ${theme
                                                                    .palette
                                                                    .primary
                                                                    .main};
                                                                width: 60%;
                                                                border-radius: 12px;
                                                                gap: 5px;
                                                            `}
                                                        >
                                                            <CircleCheckBig
                                                                size={20}
                                                            />
                                                            <ListItemText
                                                                primary={
                                                                    'Задачи'
                                                                }
                                                            />
                                                        </ListItemButton>
                                                    </List>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </List>
                </div>
            </div>
        </div>
    );
};
