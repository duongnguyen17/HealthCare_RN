import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../type/type";


const initialState: UserStateType = {
    _id: undefined,
    customInfor: { username: '', avatar: '', sex: undefined, dob: undefined, height: undefined, weight: undefined },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserProfile: () => { },
        getUserProfileSuccess: (state, { payload }) => {
            console.log('payload', payload)
            state._id = payload._id
            state.customInfor = { ...payload }
        },
        updateUserProfile: (state, { payload }) => { },
        updateUserProfileSuccess: (state, { payload }) => {
            state.customInfor = { ...payload }
        }
    }
})

export const userAction = userSlice.actions
export const userReducer = userSlice.reducer