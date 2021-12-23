import { all, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import eventSaga from "./eventSaga";
import medicineSaga from "./medicineSaga";
import visitedSaga from "./visitedSaga";
// import testSaga from "./testSaga";

export default function* rootSaga() {
  yield all([
    // takeEvery('*', getInfoAction),
    // ...testSaga
    ...medicineSaga,
    ...visitedSaga,
    ...eventSaga
  ])
}

// function* getInfoAction(action: PayloadAction) {
//   console.log(`**action: `, JSON.stringify(action))
// }