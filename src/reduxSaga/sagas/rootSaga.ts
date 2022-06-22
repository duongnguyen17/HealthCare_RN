import { all } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
// import { takeEvery } from "redux-saga/effects";
import authSaga from "./authSaga";
import deviceSaga from "./deviceSaga";
import eventsSaga from "./eventsSaga";
import healthSaga from "./healthSaga";
import medicinesSaga from "./medicinesSaga";
import userSaga from "./userSaga";
import visitedsSaga from "./visitedsSaga";

export default function* rootSaga() {
  yield all([
    // takeEvery('*', getInfoAction),
    // ...testSaga
    ...authSaga,
    ...medicinesSaga,
    ...healthSaga,
    ...visitedsSaga,
    ...eventsSaga,
    ...userSaga,
    ...deviceSaga,
  ])
}

function* getInfoAction(action: PayloadAction) {
  console.log(`**action: `, JSON.stringify(action))
}