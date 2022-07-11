import { createSlice } from "@reduxjs/toolkit";
import { DeviceStateType } from "../../type/type";


const initialState: DeviceStateType = {
    deviceConnecting: null,
    listDeviceConnected: [],
}

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {

    }
})

export const deviceAction = deviceSlice.actions
export const deviceReducer = deviceSlice.reducer