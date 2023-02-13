import { createSlice } from "@reduxjs/toolkit"
import { EventsStateType, SearchStateType } from "../../type/type"

const initialState: SearchStateType = {
    searchResult: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, { payload }) => { },
        searchSuccess: (state, { payload }) => {
            state.searchResult = payload.searchResult//.sort((a: any, b: any) => (a.date.getTime() - b.date.getTime()))

        }
    }
})

export const searchAction = searchSlice.actions
export const searchReducer = searchSlice.reducer