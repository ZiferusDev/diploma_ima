import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project } from "../../types/projecttype";

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://logotipiwe.ru/ima/api/projects',headers: {
        'content-type': 'application/json',
    }, credentials: 'include'}),
    endpoints: (builder) => ({
        createProject: builder.mutation<Project, string>(
            {
                query: (name) => ({
                    url: '',
                    method: 'POST',
                    body: JSON.stringify({name: name}),
                })
            }
          ),
        getProjects: builder.query<Project, void>(
            {
                query: () => ({
                    url: ''
                })
            }
        )
    })

})

export const {useCreateProjectMutation, useGetProjectsQuery} = projectApi