import {createSlice} from '@reduxjs/toolkit';
import {HealthStateType} from '../../type/type';

const initialState: HealthStateType = {
  isAuthorized: false,
  goalStep: 4000,
  today: undefined,
  overview: null,
  steps: undefined,
  sleepAnalysis: undefined,
  heartbeat: undefined,
  distances: undefined,
  calories: undefined,
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    onAuthorize: () => {},
    onAuthorizeSuccess: (state, {payload}) => {
      state.isAuthorized = payload.isAuthorized;
    },
    checkAuthorize: () => {},
    checkAuthSuccess: (state, {payload}) => {
      state.isAuthorized = payload.isAuthorized;
    },
    getOverviewToday: () => {},
    getOverviewTodaySuccess: (state, {payload}) => {
      state.today = payload.today;
      state.goalStep = payload.goalStep;
    },
  },
});

export const healthAction = healthSlice.actions;
export const healthReducer = healthSlice.reducer;
