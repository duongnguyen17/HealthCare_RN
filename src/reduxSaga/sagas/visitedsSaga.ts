import { call, put, takeLatest } from "redux-saga/effects";
import { AlertType } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import { addVisited, deleteVisited, getAllVisited, updateVisited, getVisited } from "../../realm/controllers/visited.controller";
import NotifiSchedule from "../../utils/Notifi";
import { visitedsAction } from "../slices/visitedsSlice";



export default [
    takeLatest(visitedsAction.getAllVisited.type, getAllVisitedSaga),
    takeLatest(visitedsAction.addVisited.type, addVisitedSaga),
    takeLatest(visitedsAction.updateVisited.type, updateVisitedSaga),
    takeLatest(visitedsAction.deleteVisited.type, deleteVisitedSaga),
    takeLatest(visitedsAction.getVisted.type, getVisitedSaga),
]

function* getAllVisitedSaga(action: any) {
    try {
        showLoading()
        //@ts-ignore
        const allVisited = yield call(getAllVisited)
        yield put(visitedsAction.getAllVisitedSuccess({ all: [...allVisited] }))
    } catch (error) {
        console.log("🚀 ~ file: visitedSaga.ts ~ line 23 ~ function*getAllVisited ~ error", error)
        showAlert(AlertType.FAIL, 'Không thể lấy danh sách lần khám')
    } finally {
        hideLoading()
    }
}
function* addVisitedSaga(action: any) {
    try {
        const visited = action.payload
        // console.log(`visited`, visited)
        showLoading()
        yield call(addVisited, visited)
        NotifiSchedule.genNotifiVisited(visited)
        //tạm thời thì sau khi thêm thì add luôn víited kia vào víitedState
        yield put(visitedsAction.addVisitedSuccess({ visited }))
    } catch (error) {
        console.log("🚀 ~ file: visitedSaga.ts ~ line 40 ~ function*addVisitedSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Không thể thêm')
    } finally {
        hideLoading()
    }
}
function* updateVisitedSaga(action: any) {
    try {
        const visited = action.payload
        showLoading()
        yield call(updateVisited, visited)
        yield put(visitedsAction.updateVisitedSuccess({ visited }))
    } catch (error) {
        console.log("🚀 ~ file: visitedSaga.ts ~ line 53 ~ function*updateVisitedSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Không thể cập nhật')
    } finally {
        hideLoading()
    }
}

function* deleteVisitedSaga(action: any) {
    try {
        const _id = action.payload
        showLoading()
        yield call(deleteVisited, _id)
        yield put(visitedsAction.deleteVisitedSuccess(_id))
    } catch (error) {
        console.log("🚀 ~ file: visitedSaga.ts ~ line 67 ~ function*deleteVisitedSaga ~ error", error)
        showAlert(AlertType.FAIL, "Không xoá được")
    } finally {
        hideLoading()
    }
}

function* getVisitedSaga(action: any) {
    try {
        showLoading()
        const _id = action.payload._id as number
        //@ts-ignore
        let visited = yield call(getVisited, _id)
        yield put(visitedsAction.getVisitedSuccess({ visited }))
    } catch (error) {
        console.log("🚀 ~ file: visitedsSaga.ts ~ line 83 ~ function*getVisitedSaga ~ error", error)
        showAlert(AlertType.FAIL, "Không lấy được thông tin lần khám!")
    } finally {
        hideLoading()
    }
}