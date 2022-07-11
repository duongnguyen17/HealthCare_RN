import { call, put, takeLatest } from "redux-saga/effects";
import { AlertType } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import { CODE, MESSAGE } from "../../services/api/constant";
import { getProfile, updateUserProfile } from "../../services/api/Request";
import { userAction } from "../slices/userSlice";

export default [
    takeLatest(userAction.getUserProfile.type, getProfileSaga),
    takeLatest(userAction.updateUserProfile.type, updateUserProfileSaga),
]

function* getProfileSaga() {
    try {
        showLoading()
        // @ts-ignore
        let res = yield call(getProfile)
        console.log('res', res)
        if (res.code === CODE.OK) {
            yield put(userAction.getUserProfileSuccess({ _id: res.data._id, ...res.data.customInfor }))
        } else {
            throw Error(res.message)
        }
    } catch (error: any) {
        console.log('ERROR - getProfileSaga', error.message)
    } finally {
        hideLoading()
    }
}

function* updateUserProfileSaga({ payload }: any) {
    try {
        showLoading()
        //@ts-ignore
        let res = yield call(updateUserProfile, payload.customInfor)
        console.log('updateUserProfileSaga', res)
        if (res?.code === CODE.OK) {
            yield put(userAction.updateUserProfileSuccess(res.data))
        }
        else {
            showAlert(AlertType.FAIL, res?.message)
            throw Error(res.message)
        }
    } catch (error) {
        console.log("🚀 ~ file: userSaga.ts ~ line 46 ~ function*updateUserProfileSaga ~ error", error)
    }
    finally {
        hideLoading()
    }
}