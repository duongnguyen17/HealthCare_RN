import { all, takeEvery } from "@redux-saga/core/effects";
import eventsSaga from "./eventsSaga";
import medicinesSaga from "./medicinesSaga";
import visitedsSaga from "./visitedsSaga";
// import testSaga from "./testSaga";

export default function* rootSaga() {
  yield all([
    // takeEvery('*', getInfoAction),
    // ...testSaga
    ...medicinesSaga,
    ...visitedsSaga,
    ...eventsSaga
  ])
}

// function* getInfoAction(action: PayloadAction) {
//   console.log(`**action: `, JSON.stringify(action))
// }