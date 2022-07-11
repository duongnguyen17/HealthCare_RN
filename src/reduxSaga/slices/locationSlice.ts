import { createSlice } from "@reduxjs/toolkit";
import { DeviceStateType, LocationStateType } from "../../type/type";


const initialState: LocationStateType = {
    all: [],
    temp: undefined,
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        addLocation: (state, { payload }) => { },
        getLocation: (state, { payload }) => { },
        getLocationSuccess: (state, { payload }) => {
            state.temp = payload.location
        }
    }
})

export const locationAction = locationSlice.actions
export const locationReducer = locationSlice.reducer