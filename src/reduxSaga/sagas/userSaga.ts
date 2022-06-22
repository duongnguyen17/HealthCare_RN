import { put, takeLatest } from "redux-saga/effects";
import { hideLoading, showLoading } from "../../components/Loading";
import { CODE, MESSAGE } from "../../services/api/constant";
import { getProfile } from "../../services/api/Request";
import { userAction } from "../slices/userSlice";

export default [
    takeLatest(userAction.getUserProfile.type, getProfileSaga)
]


function* getProfileSaga() {
    try {
        showLoading()
        // @ts-ignore
        let res = yield getProfile()
        if (res.error === null) {
            yield put(userAction.getUserProfileSuccess(res.data.customInfo))
        } else {
            throw Error(res.message)
        }
    } catch (error: any) {
        console.log('ERROR - getProfileSaga', error.message)
    } finally {
        hideLoading()
    }
}