import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../type/type";


const initialState: UserStateType = {
    profile: { username: '', avatar: '' },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserProfile: () => { },
        getUserProfileSuccess: (state, { payload }) => {
            state.profile.username = payload.displayName
            state.profile.avatar = payload.photoUri
        },
    }
})

export const userAction = userSlice.actions
export const userReducer = userSlice.reducer