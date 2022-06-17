import { all } from "@redux-saga/core/effects";
import authSaga from "./authSaga";
import eventsSaga from "./eventsSaga";
import healthSaga from "./healthSaga";
import medicinesSaga from "./medicinesSaga";
import visitedsSaga from "./visitedsSaga";
// import testSaga from "./testSaga";

export default function* rootSaga() {
  yield all([
    // takeEvery('*', getInfoAction),
    // ...testSaga
    ...authSaga,
    ...medicinesSaga,
    ...healthSaga,
    ...visitedsSaga,
    ...eventsSaga,
  ])
}

// function* getInfoAction(action: PayloadAction) {
//   console.log(`**action: `, JSON.stringify(action))
// }