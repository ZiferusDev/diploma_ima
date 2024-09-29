import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/auth'
import { projectApi } from './services/project'
import { usersApi } from './services/users'
import { tasksApi } from './services/tasks'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        authApi.middleware,
        projectApi.middleware,
        usersApi.middleware,
        tasksApi.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch