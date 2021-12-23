import { createSlice } from "@reduxjs/toolkit"
import { MedicineStateType } from "../../type/type"

const initialState: MedicineStateType = {
    all: []
}

const medicineSlice = createSlice({
    name: 'medicine',
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
            let medicine = payload.visited
            let allTemp = [...state.all]
            let index = allTemp.findIndex((e) => e._id == medicine._id)
            allTemp[index].title = medicine.title
            allTemp[index].isDone = medicine.isDone
            allTemp[index].remind = medicine.remind
            allTemp[index].during = medicine.during
            state.all = allTemp
        }
    }
})

export const medicineAction = medicineSlice.actions
export const medicineReducer = medicineSlice.reducer