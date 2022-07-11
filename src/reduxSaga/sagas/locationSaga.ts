import { call, put, takeLatest } from "redux-saga/effects";
import { hideLoading, showLoading } from "../../components/Loading";
import { addLocation, getLocation } from "../../realm/controllers/location.controller";
import { locationAction } from "../slices/locationSlice";

export default [
    takeLatest(locationAction.addLocation.type, addLocationSaga),
    takeLatest(locationAction.getLocation.type, getLocationSaga),
]

function* addLocationSaga({ payload }: any) {
    try {
        showLoading()
        const location = payload
        yield call(addLocation, location)
    } catch (error) {
        console.log("🚀 ~ file: locationSaga.ts ~ line 16 ~ function*addLocationSaga ~ error", error)
    } finally {
        hideLoading()
    }
}


function* getLocationSaga({ payload }: any) {
    try {
        const _id = payload
        //@ts-ignore
        const location = yield call(getLocation, _id)
        yield put(locationAction.getLocationSuccess({ location }))
    } catch (error) {

    }
}