import {  fetchBaseQuery } from "@reduxjs/toolkit/query";
import { User } from "../../types/usertype";
import { createApi } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://logotipiwe.ru/ima/', headers: {
        "Content-Type": 'application/json'
    },credentials: 'include'}),
    endpoints: (builder) => ({
        getUsers: builder.query<User[],void>( {
            query:() => ({
                url: 'api/users',
                method: 'GET'
            })
        }),
        getCurrentUser: builder.query<User,void>({
            query:() => ({
                url: 'api/users/me',
                method: 'GET'
            })
        })
    })
})
export const {useGetUsersQuery, useGetCurrentUserQuery} = usersApi