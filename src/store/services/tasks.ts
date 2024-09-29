import {  fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Task } from "../../types/tasktype";
import { createApi } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://logotipiwe.ru/ima/api/',headers: {
        'content-type': 'application/json',
    }, credentials: 'include' }),
    endpoints: (builder) => ({
        getTasksByProject: builder.query<Task[], string>({
            query: (id) => ({
                url: `projects/${id}/tasks`,
                method: 'GET',

            })
        }),
        createTask: builder.mutation<Task, {id: string; due: string}>({
            query: (data) => ({
                url: 'tasks',
                method: 'POST',
                body: JSON.stringify({
                    projectId: data.id,
                    due: data.due
                })
            })
        }),
        updateTask: builder.mutation<Task, Partial<Task>>({
            query: (data) => ({
                url: 'tasks',
                method: 'PUT',
                body: JSON.stringify({...data})
            }
            )
        }),
        deleteTask: builder.query<void, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {useGetTasksByProjectQuery, useCreateTaskMutation, useDeleteTaskQuery, useUpdateTaskMutation} = tasksApi;