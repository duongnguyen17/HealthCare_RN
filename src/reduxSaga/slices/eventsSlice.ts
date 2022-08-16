import {createSlice} from '@reduxjs/toolkit';
import {HEvent} from '../../common';
import {EventsStateType} from '../../type/type';

const initialState: EventsStateType = {
  listEvent: [],
  searchResult: [],
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getListEvent: (state, {payload}) => {},
    getListEventSuccess: (state, {payload}) => {
      state.listEvent = payload.listEvent;
    },
    searchEvent: (state, {payload}) => {},
    searchEventSuccess: (state, {payload}) => {
      state.searchResult = payload.searchResult;
    },

    getEventInMonth: action => {},
    getEventInMonthSuccess: (state, {payload}) => {},
  },
});

export const eventsAction = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
