import { all, takeEvery } from "@redux-saga/core/effects";
import eventsSaga from "./eventsSaga";
import medicinesSaga from "./medicinesSaga";
import visitedsSaga from "./visitedsSaga";
// import testSaga from "./testSaga";

export default function* rootSaga() {
  yield all([
    takeEvery('*', getInfoAction),
    ...medicinesSaga,
    ...visitedsSaga,
    ...eventsSaga
  ])
}

function* getInfoAction(action: any) {
  console.log(`action ${action.type}`, action.payload)
}