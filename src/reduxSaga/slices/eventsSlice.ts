import {createSlice} from '@reduxjs/toolkit';
import {HEvent} from '../../common';
import {EventsStateType} from '../../type/type';

const initialState: EventsStateType = {
  listEvent: [],
};

const eventsSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getListEvent: (state, {payload}) => {},
    getListEventSuccess: (state, {payload}) => {
      state.listEvent = payload.listEvent;
    },


    getEventInMonth: action => {},
    getEventInMonthSuccess: (state, {payload}) => {},
    searchEvent: (state, {payload}) => {},
    searchEventSuccess: (state, {payload}) => {
      // console.log(`payload.searchResult`, payload.searchResult)
      state.searchResult = payload.searchResult.sort(
        (a: HEvent, b: HEvent) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    },
  },
});

export const eventsAction = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
