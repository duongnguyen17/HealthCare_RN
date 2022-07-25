import {createSlice} from '@reduxjs/toolkit';
import {VisitedsStateType} from '../../type/type';

const initialState: VisitedsStateType = {
  listVisited: [],
  visited: null,
};

const visitedsSlice = createSlice({
  name: 'visiteds',
  initialState,
  reducers: {
    searchVisited: (state, {payload}) => {},
    searchVisitedSuccess: (state, {payload}) => {
      state.listVisited = payload.listVisited;
    },
    getVisted: (state, {payload}) => {},
    getVisitedSuccess: (state, {payload}) => {
      state.visited = payload.visited;
    },

    addVisited: (state, {payload}) => {},
    deleteVisited: (state, {payload}) => {},
    updateVisited: (state, {payload}) => {},
    updateVisitedSuccess: (state, {payload}) => {},
  },
});

export const visitedsAction = visitedsSlice.actions;
export const visitedsReducer = visitedsSlice.reducer;
