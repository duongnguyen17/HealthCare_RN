import { createSlice } from "@reduxjs/toolkit";
import { AuthStateType } from "../../type/type";


const initialState: AuthStateType = {
    isLogin: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => { },
        loginSuccess: (state, { payload }) => {
            state.isLogin = payload.isLogin
        },
        logout: () => { },
        logoutSuccess: (state) => {
            state.isLogin = false
        },
        verifyToken: () => {

        },
        verifyTokenSuccess: (state, { payload }) => {
            state.isLogin = payload.isLogin
        },
    }
})

export const authAction = authSlice.actions
export const authReducer = authSlice.reducer