import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './services/auth'
import { projectApi } from './services/project'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, projectApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch