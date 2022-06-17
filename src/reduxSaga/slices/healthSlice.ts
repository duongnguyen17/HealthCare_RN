import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    isAuthorize: false,

}

const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        onAuthorize: () => { },
        onAuthorizeSuccess: (state, { payload }) => {
            state.isAuthorize = payload.isAuthorize
        },
        checkAuthorize: () => { },
        checkAuthSuccess: (state, { payload }) => {
            state.isAuthorize = payload.isAuthorize
        },
    }
})


export const healthAction = healthSlice.actions
export const healthReducer = healthSlice.reducer