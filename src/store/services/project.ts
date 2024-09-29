import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project } from "../../types/projecttype";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://logotipiwe.ru/ima/api/',headers: {
        'content-type': 'application/json',
    }, credentials: 'include'}),
    tagTypes: ['Projects','User'],
    endpoints: (builder) => ({
        createProject: builder.mutation<Project, string>(
            {
                query: (name) => ({
                    url: 'projects',
                    method: 'POST',
                    body: JSON.stringify({name: name}),
                }),
                invalidatesTags: ['Projects']
            }
          ),
        getProjects: builder.query<Project, void>(
            {
                query: () => ({
                    url: 'projects'
                }),
                providesTags: ['Projects']
            }
        ),
        addIntegration: builder.mutation<void, {lab?: string, hub?: string}>({
            query: (data) => ({
                url: 'users/tokens',
                method: 'POST',
                params: {
                    gitlabToken: data.lab,
                    githubToken: data.hub
                }
            }),
            invalidatesTags: ['User']
        }),
        importProjects: builder.mutation<void, void>(
            {
                query: () => ({
                    url: '/git/gitlab',
                    method: 'GET'
                }),
                invalidatesTags: ['Projects']
            }
        ),
        
    })

})

export const {useCreateProjectMutation, useGetProjectsQuery, useAddIntegrationMutation, useImportProjectsMutation} = projectApi