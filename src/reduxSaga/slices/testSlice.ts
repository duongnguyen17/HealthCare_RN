import { createSlice } from '@reduxjs/toolkit'
import { TestStateType } from '../../type/type'


const initialState: TestStateType = {
  count: 0
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
  }
})

export const testAction = testSlice.actions
export const testReducer = testSlice.reducer