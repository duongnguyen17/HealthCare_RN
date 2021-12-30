import { createSlice } from "@reduxjs/toolkit"
import { HEvent } from "../../common"
import { EventsStateType } from "../../type/type"


const initialState: EventsStateType = {
    all: []
}

const eventsSlice = createSlice({
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

export const eventsAction = eventsSlice.actions
export const eventsReducer = eventsSlice.reducer