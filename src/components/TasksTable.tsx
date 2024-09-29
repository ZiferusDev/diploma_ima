import { useParams, useSearchParams } from 'react-router-dom';

import {
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useGetTasksByProjectQuery,
    useUpdateTaskMutation,
} from '../store/services/tasks';
import { useGetProjectsQuery } from '../store/services/project';
import {
    Divider,
    IconButton,
    LinearProgress,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Task } from '../types/tasktype';
import { css } from '@emotion/css';
import {
    ChartPie,
    CircleCheck,
    CircleDashed,
    CircleDot,
    CircleUser,
    LoaderCircle,
    Pencil,
    Plus,
    X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';

export const TasksTable = () => {
    const [searchParams, _] = useSearchParams();
    const projectId = searchParams.get('projectid');

    const { data: projects } = useGetProjectsQuery();

    const {
        data: tasks,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetTasksByProjectQuery(projectId || '');

    return (
        <div
            className={css`
                width: 100%;
                height: calc(100vh - 60px);
            `}
        >
            {isFetching || isLoading || !isSuccess ? (
                <LinearProgress />
            ) : (
                <>
                    <div
                        className={css`
                            margin: 16px;
                        `}
                    >
                        <Typography color="primary" variant="h4">
                            {'Проект: '}
                            {(() => {
                                return (
                                    projects?.find(
                                        elem => elem.id === projectId,
                                    )?.name || 'Имя проекта не найдено'
                                );
                            })()}
                        </Typography>
                    </div>
                    <div>
                        {(() => {
                            console.log(tasks);

                            const openedTasks = tasks.filter(
                                task => task.status === 'OPEN',
                            );
                            const progressTasks = tasks.filter(
                                task => task.status === 'IN_PROGRESS',
                            );
                            const analTasks = tasks.filter(
                                task => task.status === 'IN_ANALYSIS',
                            );
                            const testTasks = tasks.filter(
                                task => task.status === 'IN_TESTING',
                            );
                            const doneTasks = tasks.filter(
                                task => task.status === 'DONE',
                            );

                            return (
                                <>
                                    {Boolean(openedTasks.length) && (
                                        <>
                                            <TasksHeader
                                                status="OPEN"
                                                count={openedTasks.length}
                                            />
                                            {openedTasks.map(task => {
                                                return (
                                                    <TaskBody
                                                        key={task.id}
                                                        status={task.status}
                                                        name={task.name}
                                                        task={task}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                    {Boolean(progressTasks.length) && (
                                        <>
                                            <TasksHeader
                                                status="IN_PROGRESS"
                                                count={progressTasks.length}
                                            />
                                            {progressTasks.map(task => {
                                                return (
                                                    <TaskBody
                                                        key={task.id}
                                                        status={task.status}
                                                        name={task.name}
                                                        task={task}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                    {Boolean(analTasks.length) && (
                                        <>
                                            <TasksHeader
                                                status="IN_ANALYSIS"
                                                count={analTasks.length}
                                            />
                                            {analTasks.map(task => {
                                                return (
                                                    <TaskBody
                                                        key={task.id}
                                                        status={task.status}
                                                        name={task.name}
                                                        task={task}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                    {Boolean(testTasks.length) && (
                                        <>
                                            <TasksHeader
                                                status="IN_TESTING"
                                                count={testTasks.length}
                                            />
                                            {testTasks.map(task => {
                                                return (
                                                    <TaskBody
                                                        key={task.id}
                                                        status={task.status}
                                                        name={task.name}
                                                        task={task}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                    {Boolean(doneTasks.length) && (
                                        <>
                                            <TasksHeader
                                                status="DONE"
                                                count={doneTasks.length}
                                            />
                                            {doneTasks.map(task => {
                                                return (
                                                    <TaskBody
                                                        key={task.id}
                                                        status={task.status}
                                                        name={task.name}
                                                        task={task}
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </>
            )}
        </div>
    );
};

const TaskBody = ({
    status,
    name,
    task,
}: {
    status: Task['status'];
    name: string | null;
    task: Task;
}) => {
    const [isEdit, setEdit] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [updateMutation] = useUpdateTaskMutation();
    const [deleteTaskMutation] = useDeleteTaskMutation();

    return (
        <div
            className={css`
                width: 100%;
                height: 40px;
                background-color: #f5f5f5;
                padding: 0 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                :hover {
                    background-color: #d3d3d3;
                }
            `}
        >
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 16px;
                `}
            >
                <Dropdown>
                    <MenuButton
                        className={css`
                            border: none;
                            background: none;
                        `}
                    >
                        {(() => {
                            if (status === 'OPEN')
                                return (
                                    <>
                                        <CircleDot
                                            size={16}
                                            color={'#FFD740'}
                                        />
                                    </>
                                );
                            if (status === 'DONE')
                                return (
                                    <>
                                        <CircleCheck
                                            size={16}
                                            color={'#14AE5C'}
                                        />
                                    </>
                                );
                            if (status === 'IN_ANALYSIS')
                                return (
                                    <>
                                        <ChartPie size={16} color={'#EA3FB8'} />
                                    </>
                                );
                            if (status === 'IN_PROGRESS')
                                return (
                                    <>
                                        <LoaderCircle
                                            size={16}
                                            color={'#2962FF'}
                                        />
                                    </>
                                );
                            if (status === 'IN_TESTING')
                                return (
                                    <>
                                        <CircleDashed
                                            size={16}
                                            color={'#EC221F'}
                                        />
                                    </>
                                );
                            throw new Error('Unexpected status type');
                        })()}
                    </MenuButton>
                    <Menu
                        className={css`
                            background: #fff;
                            border: 1px solid #2196f3;
                            border-radius: 12px;
                            padding: 12px 0;
                        `}
                    >
                        <MenuItem
                            onClick={() => {
                                updateMutation({
                                    ...task,
                                    status: 'IN_TESTING',
                                });
                            }}
                            className={css`
                                display: flex;
                                align-items: center;
                                gap: 5px;
                                padding: 4px 8px;
                                :hover {
                                    background-color: #def0ff;
                                }
                            `}
                        >
                            <CircleDashed size={16} color={'#EC221F'} />
                            <Typography fontSize={12}>
                                Change to Testing
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                updateMutation({
                                    ...task,
                                    status: 'IN_PROGRESS',
                                });
                            }}
                            className={css`
                                display: flex;
                                align-items: center;
                                gap: 5px;
                                padding: 4px 8px;
                                :hover {
                                    background-color: #def0ff;
                                }
                            `}
                        >
                            <LoaderCircle size={16} color={'#2962FF'} />
                            <Typography fontSize={12}>
                                Change to In Progress
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                updateMutation({
                                    ...task,
                                    status: 'IN_ANALYSIS',
                                });
                            }}
                            className={css`
                                display: flex;
                                align-items: center;
                                gap: 5px;
                                padding: 4px 8px;
                                :hover {
                                    background-color: #def0ff;
                                }
                            `}
                        >
                            <ChartPie size={16} color={'#EA3FB8'} />
                            <Typography fontSize={12}>
                                Change to In Analys
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                updateMutation({
                                    ...task,
                                    status: 'DONE',
                                });
                            }}
                            className={css`
                                display: flex;
                                align-items: center;
                                gap: 5px;
                                padding: 4px 8px;
                                :hover {
                                    background-color: #def0ff;
                                }
                            `}
                        >
                            <CircleCheck size={16} color={'#14AE5C'} />
                            <Typography fontSize={12}>
                                Change to Done
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                updateMutation({
                                    ...task,
                                    status: 'OPEN',
                                });
                            }}
                            className={css`
                                display: flex;
                                align-items: center;
                                gap: 5px;
                                padding: 4px 8px;
                                :hover {
                                    background-color: #def0ff;
                                }
                            `}
                        >
                            <CircleDot size={16} color={'#FFD740'} />
                            <Typography fontSize={12}>
                                Change to Open
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Dropdown>
                <div
                    className={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <IconButton
                        onClick={() => {
                            if (isEdit && inputRef.current) {
                                updateMutation({
                                    ...task,
                                    name: inputRef.current.value,
                                });
                            }
                            setEdit(prev => !prev);
                        }}
                        sx={{ marginRight: '5px' }}
                    >
                        {isEdit ? (
                            <X size={14} color="#5A5A5A" />
                        ) : (
                            <Pencil size={14} color="#5A5A5A" />
                        )}
                    </IconButton>
                    {isEdit ? (
                        <TextField size="small" inputRef={inputRef} />
                    ) : (
                        <Typography color="#5A5A5A" fontSize={14}>
                            {name || 'Нет имени задачи'}
                        </Typography>
                    )}
                </div>
            </div>
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 5px;
                `}
            >
                <Tooltip title={'Никто не взял задачу'}>
                    <CircleUser size={16} color="#757575" />
                </Tooltip>
                <IconButton
                    onClick={() => {
                        deleteTaskMutation(task.id);
                    }}
                >
                    <X size={16} color="#757575" />
                </IconButton>
            </div>
        </div>
    );
};

const TasksHeader = ({
    status,
    count,
}: {
    status: Task['status'];
    count: number;
}) => {
    const [searchParams, _] = useSearchParams();
    const projectId = searchParams.get('projectid');

    const [createMutation] = useCreateTaskMutation();
    return (
        <div
            className={css`
                width: 100%;
                height: 40px;
                background-color: #5a5a5a;
                padding: 0 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `}
        >
            <div
                className={css`
                    display: flex;
                    align-items: center;
                    gap: 16px;
                `}
            >
                {(() => {
                    if (status === 'OPEN')
                        return (
                            <>
                                <CircleDot size={16} color={'#FFD740'} />
                                <Typography color="#FFF">Открыты</Typography>
                                <Typography color="#FFF">{count}</Typography>
                            </>
                        );
                    if (status === 'DONE')
                        return (
                            <>
                                <CircleCheck size={16} color={'#14AE5C'} />
                                <Typography color="#FFF">Готово</Typography>
                                <Typography color="#FFF">{count}</Typography>
                            </>
                        );
                    if (status === 'IN_ANALYSIS')
                        return (
                            <>
                                <ChartPie size={16} color={'#EA3FB8'} />
                                <Typography color="#FFF">Анализ</Typography>
                                <Typography color="#FFF">{count}</Typography>
                            </>
                        );
                    if (status === 'IN_PROGRESS')
                        return (
                            <>
                                <LoaderCircle size={16} color={'#2962FF'} />
                                <Typography color="#FFF">В Процессе</Typography>
                                <Typography color="#FFF">{count}</Typography>
                            </>
                        );
                    if (status === 'IN_TESTING')
                        return (
                            <>
                                <CircleDashed size={16} color={'#EC221F'} />
                                <Typography color="#FFF">
                                    Тестируется
                                </Typography>
                                <Typography color="#FFF">{count}</Typography>
                            </>
                        );
                    throw new Error('Unexpected status type');
                })()}{' '}
            </div>
            <IconButton
                onClick={async () => {
                    if (!projectId) throw new Error('No project ID provided');
                    await createMutation({
                        id: projectId,
                        due: null,
                    });
                }}
            >
                <Plus size={20} color="#FFF" />
            </IconButton>
        </div>
    );
};
