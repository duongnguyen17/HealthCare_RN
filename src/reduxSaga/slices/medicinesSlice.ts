import { createSlice } from "@reduxjs/toolkit"
import { Medicine } from "../../common"
import { MedicinesStateType } from "../../type/type"

const initialState: MedicinesStateType = {
    all: []
}

const medicinesSlice = createSlice({
    name: 'medicines',
    initialState,
    reducers: {
        getAllMedicine: () => { },
        getAllMedicineSuccess: (state, { payload }) => {
            state.all = payload.all
        },
        addMedicine: (state, { payload }) => {
        },
        addMedicineSuccess: (state, { payload }) => {
            state.all = [...state.all, payload].sort((a, b) => (a.start - b.start))
        },
        deleteMedicine: (state, { payload }) => {

        },
        deleteMedicineSuccess: (state, { payload }) => {
            let _id = payload
            let allTemp = [...state.all]
            let index = allTemp.findIndex((e) => e._id == _id)
            allTemp.splice(index, 1)
            state.all = allTemp
        },
        updateMedicine: (state, { payload }) => {
        },
        updateMedicineSuccess: (state, { payload }) => {
            let medicine: Medicine = payload.medicine
            let allTemp: Array<Medicine> = [...state.all]
            let index = allTemp.findIndex((e) => e._id == medicine._id)
            allTemp[index].title = medicine.title
            allTemp[index].remind = medicine.remind
            allTemp[index].during = medicine.during
            state.all = allTemp
        },
        getAllMedicineOfVisited: (state, { payload }) => {

        },
        getAllMedicineOfVisitedSuccess: (state, { payload }) => {

        },
        updateAllMedicineOfVisited: (state, { payload }) => {

        },
        // updateAllMedicineOfVisitedSuccess: (state, { payload }) => {

        // }

    }
})


export const medicinesAction = medicinesSlice.actions
export const medicinesReducer = medicinesSlice.reducer