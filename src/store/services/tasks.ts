import {  fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Task } from "../../types/tasktype";
import { createApi } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://logotipiwe.ru/ima/api/',headers: {
        'content-type': 'application/json',
    }, credentials: 'include' }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasksByProject: builder.query<Task[], string>({
            query: (id) => ({
                url: `projects/${id}/tasks`,
                method: 'GET',

            }),
            providesTags: ['Task']
        }),
        createTask: builder.mutation<Task, {id: string; due: string | null}>({
            query: (data) => ({
                url: 'tasks',
                method: 'POST',
                body: JSON.stringify({
                    projectId: data.id,
                    due: data.due
                })
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: builder.mutation<Task, Partial<Task>>({
            query: (data) => ({
                url: 'tasks',
                method: 'PUT',
                body: JSON.stringify({...data})
            }
            ),
            invalidatesTags: ['Task']
        }),
        deleteTask: builder.mutation<void, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Task']
        })
    })
})

export const {useGetTasksByProjectQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi;