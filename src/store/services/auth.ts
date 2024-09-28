import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthRegisterData, type AuthCredentials, type AuthToken } from "../../types/authtype";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://logotipiwe.ru/ima/auth', headers: {
        "Content-Type": 'application/json'
    },credentials: 'include'}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
    getToken: builder.mutation<AuthToken, AuthCredentials>({
            query: (credentials) => ({
                keepUnusedDataFor: 24*60*1000,
                url: '/login',
                method: 'POST',
                
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                }),
            }),
            
        }),
    register: builder.mutation<void, AuthRegisterData>({
        query: (data) => ({
            url: '/signup',
            method: 'POST',
            body: {
                email: data.email,
                fullName: data.fullname,
                password: data.password
            }
        })
    })
    }),
})

export const {useGetTokenMutation, useRegisterMutation} = authApi;