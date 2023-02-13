import {createSlice} from '@reduxjs/toolkit';
import {Medicine} from '../../common';
import {MedicinesStateType} from '../../type/type';

const initialState: MedicinesStateType = {
  listMedicine: [],
  medicine: null,
};

const medicinesSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    searchMedicine: (state, {payload}) => {},
    searchMedicineSuccess: (state, {payload}) => {
      state.listMedicine = payload.listMedicine;
    },
    getMedicine: (state, {payload}) => {},
    getMedicineSuccess: (state, {payload}) => {
      state.medicine = payload.medicine;
    },
    addMedicine: (state, {payload}) => {},
    deleteMedicine: (state, {payload}) => {},
    updateSchedule: (state, {payload}) => {},

    addTempMedicine: (state, {payload}) => {},
    updateMedicine: (state, {payload}) => {},
    updateMedicineSuccess: (state, {payload}) => {
      let medicine: Medicine = payload.medicine;
      let allTemp: Array<Medicine> = [...state.all];
      let index = allTemp.findIndex(e => e._id == medicine._id);
      allTemp[index].title = medicine.title;
      allTemp[index].remind = medicine.remind;
      allTemp[index].during = medicine.during;
      state.all = allTemp;
    },
    getAllMedicineOfVisited: (state, {payload}) => {},
    getAllMedicineOfVisitedSuccess: (state, {payload}) => {},
    updateAllMedicineOfVisited: (state, {payload}) => {},
    // updateAllMedicineOfVisitedSuccess: (state, { payload }) => {

    // },
    getMedicines: (state, {payload}) => {},
    getMedicinesSuccess: (state, {payload}) => {
      state.tempMedicines = payload.medicines;
    },
  },
});

export const medicinesAction = medicinesSlice.actions;
export const medicinesReducer = medicinesSlice.reducer;
