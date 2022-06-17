import { put, takeLatest } from "redux-saga/effects";
import { HGoogleFit } from "../../utils/GoogleFit";
import { healthAction } from "../slices/healthSlice";


export default [
    takeLatest(healthAction.onAuthorize.type, onAuthorizeSaga),
    takeLatest(healthAction.checkAuthorize.type, checkAuthorizeSaga)
]


function* onAuthorizeSaga() {
    try {
        //@ts-ignore
        const result = yield HGoogleFit.authorize()
        if (result?.success) {
            yield put(healthAction.onAuthorizeSuccess({ isAuthorized: true }))
        } else {
            yield put(healthAction.onAuthorizeSuccess({ isAuthorized: false }))

        }
    } catch (error) {
        console.log("🚀 ~ file: healthSaga.ts ~ line 14 ~ function*onAuthorize ~ error", error)
    }
}

function* checkAuthorizeSaga() {
    try {
        //@ts-ignore
        const result = yield HGoogleFit.checkIsAuthorized()
        yield put(healthAction.checkAuthSuccess({ isAuthorized: result }))
    } catch (error) {

    }
}