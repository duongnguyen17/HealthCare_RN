import { all, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import testSaga from "./testSaga";

export default function* rootSaga() {
  yield all([
    takeEvery('*', getInfoAction),
    ...testSaga
  ])
}

function* getInfoAction(action: PayloadAction) {
  console.log(`**action: `, JSON.stringify(action))
}