import {createSlice} from '@reduxjs/toolkit';
import {DeviceStateType, LocationStateType} from '../../type/type';

const initialState: LocationStateType = {
  listLocation: [],
  location: undefined,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    searchLocation: (state, {payload}) => {},
    searchLocationSuccess: (state, {payload}) => {
      state.listLocation = payload.listLocation;
    },
    addLocation: (state, {payload}) => {},
    getLocation: (state, {payload}) => {},
    getLocationSuccess: (state, {payload}) => {
      state.location = payload.location;
    },
    deleteLocation: (state, {payload}) => {},
  },
});

export const locationAction = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
