import { createSlice } from "@reduxjs/toolkit";
import { HEvent } from "../../common";
import { EventsStateType } from "../../type/type";


const initialState: EventsStateType = {
    all: [],
    searchResult: []
}

const eventsSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        getAllEvent: (action) => {

        },
        getAllEventSuccess: (state, { payload }) => {
            state.all = payload.all.sort((a: HEvent, b: HEvent) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
        },
        getEventInMonth: (action) => {

        },
        getEventInMonthSuccess: (state, { payload }) => {

        },
        searchEvent: (state, { payload }) => {

        },
        searchEventSuccess: (state, { payload }) => {
            // console.log(`payload.searchResult`, payload.searchResult)
            state.searchResult = payload.searchResult.sort((a: HEvent, b: HEvent) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
        }
    }
})

export const eventsAction = eventsSlice.actions
export const eventsReducer = eventsSlice.reducer