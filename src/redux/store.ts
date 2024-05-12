import { configureStore } from '@reduxjs/toolkit';
import authSlice, { authApi } from './slices/authSlice';
// ...

export const store = configureStore({
    reducer: {
        authSlice: authSlice,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch