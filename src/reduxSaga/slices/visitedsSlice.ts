import { createSlice } from "@reduxjs/toolkit"
import { VisitedsStateType } from "../../type/type"

const initialState: VisitedsStateType = {
    all: [],
    current: null,
}

const visitedsSlice = createSlice({
    name: 'visiteds',
    initialState,
    reducers: {
        getAllVisited: () => { },
        getAllVisitedSuccess: (state, { payload }) => {
            state.all = payload.all
        },
        addVisited: (state, { payload }) => {
        },
        getVisited: (state, { payload }) => {
        },
        getVisitedSuccess: (state, { payload }) => {
            state.current = payload.visited
        },
        addVisitedSuccess: (state, { payload }) => {
            state.all = [...state.all, payload]
            // console.log(`state.all`, state.all)
        },
        deleteVisited: (state, { payload }) => {

        },
        deleteVisitedSuccess: (state, { payload }) => {
            let _id = payload
            let allTemp = [...state.all]
            let index = allTemp.findIndex((e) => e._id == _id)
            allTemp.splice(index, 1)
            state.all = allTemp
        },
        updateVisited: (state, { payload }) => {
        },
        updateVisitedSuccess: (state, { payload }) => {
            let visited = payload.visited
            let allTemp = [...state.all]
            let index = allTemp.findIndex((e) => e._id == visited._id)
            allTemp[index].title = visited.title
            allTemp[index].pre = visited.pre
            allTemp[index].location = visited.location
            allTemp[index].date = visited.date
            state.all = allTemp
        }
    }
})


export const visitedsAction = visitedsSlice.actions
export const visitedsReducer = visitedsSlice.reducer