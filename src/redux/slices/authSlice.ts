import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import APIEndpoints from '../../APIEndpoints';

//API functions

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: APIEndpoints.backend_url }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: () => ({
                url: '/login',
                method: 'POST',
                body: {
                    email: '',
                    password: '',
                },
            }),
        }),
    }),
})

// Define a type for the slice state
interface CounterState {
    email: string;
    password: string;
    status: 'idle' | 'loading' | 'success' | 'failed';
}

// Define the initial state using that type
const initialState: CounterState = {
    email: '',
    password: '',
    status: 'idle'
}

export const authSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchPending, (state) => {
                state.status = 'loading'
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
                state.status = 'success'
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.status = 'failed'
            })
    }

});
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.authSlice

export default authSlice.reducer