import {createSlice} from '@reduxjs/toolkit';
import {UserStateType} from '../../type/type';

const initialState: UserStateType = {
  _id: undefined,
  customInfor: {
    _id: undefined,
    nickname: '',
    avatar: '',
    gender: undefined,
    dob: undefined,
    height: undefined,
    weight: undefined,
    goalStep: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserProfile: (state, {payload}) => {},
    getUserProfileSuccess: (state, {payload}) => {
      state._id = payload._id;
      state.customInfor = payload;
    },
    updateUserProfile: (state, {payload}) => {},
    updateUserProfileSuccess: (state, {payload}) => {
      state.customInfor = payload;
    },
  },
});

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
