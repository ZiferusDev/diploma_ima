import { useParams, useSearchParams } from 'react-router-dom';
import { useGetTasksByProjectQuery } from '../store/services/tasks';
import { useGetProjectsQuery } from '../store/services/project';
import { IconButton, LinearProgress, Typography } from '@mui/material';
import { Task } from '../types/tasktype';
import { css } from '@emotion/css';
import {
    ChartPie,
    CircleCheck,
    CircleDashed,
    CircleDot,
    CircleUser,
    LoaderCircle,
    Plus,
} from 'lucide-react';

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
                    <Typography color="primary" variant="h4">
                        {(() => {
                            return (
                                projects?.find(elem => elem.id === projectId)
                                    ?.name || 'Имя проекта не найдено'
                            );
                        })()}
                    </Typography>
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
                                                        status={task.status}
                                                        name={task.name}
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
                                                        status={task.status}
                                                        name={task.name}
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
                                                        status={task.status}
                                                        name={task.name}
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
                                                        status={task.status}
                                                        name={task.name}
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
                                                        status={task.status}
                                                        name={task.name}
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
}: {
    status: Task['status'];
    name: string | null;
}) => {
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
                {(() => {
                    if (status === 'OPEN')
                        return (
                            <>
                                <CircleDot size={16} color={'#FFD740'} />
                            </>
                        );
                    if (status === 'DONE')
                        return (
                            <>
                                <CircleCheck size={16} color={'#14AE5C'} />
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
                                <LoaderCircle size={16} color={'#2962FF'} />
                            </>
                        );
                    if (status === 'IN_TESTING')
                        return (
                            <>
                                <CircleDashed size={16} color={'#EC221F'} />
                            </>
                        );
                    throw new Error('Unexpected status type');
                })()}
                <Typography color="#5A5A5A" fontSize={14}>
                    {name || 'Нет имени задачи'}
                </Typography>
            </div>
            <div>
                <CircleUser size={16} color="#757575" />
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
            <IconButton>
                <Plus size={20} color="#FFF" />
            </IconButton>
        </div>
    );
};
