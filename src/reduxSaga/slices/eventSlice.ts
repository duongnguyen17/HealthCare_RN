import { createSlice } from "@reduxjs/toolkit"
import { HEvent } from "../../common"
import { EventStateType } from "../../type/type"


const initialState: EventStateType = {
    all: []
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        getAllEvent: (action) => {

        },
        getAllEventSuccess: (state, { payload }) => {
            state.all = payload.all.sort((a: HEvent, b: HEvent) => (a.date.getTime() - b.date.getTime()))
        },
        getEventInMonth: (action) => {

        },
        getEventInMonthSuccess: (state, { payload }) => {

        }
    }
})

export const eventAction = eventSlice.actions
export const eventReducer = eventSlice.reducer