import { createSlice } from "@reduxjs/toolkit";
import { AuthStateType } from "../../type/type";


const initialState: AuthStateType = {
    isLogin: false,
    _id: '',
    error: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signup: (state, { payload }) => { },
        signupSuccess: (state, { payload }) => {
            state._id = payload._id
            state.isLogin = payload.isLogin
        },
        login: (state, { payload }) => { },
        loginSuccess: (state, { payload }) => {
            state._id = payload._id
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
            state._id = payload._id
        },
    }
})

export const authAction = authSlice.actions
export const authReducer = authSlice.reducer