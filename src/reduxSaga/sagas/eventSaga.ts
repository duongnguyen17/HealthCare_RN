import { put, takeLatest, call } from "redux-saga/effects";
import { AlertType, EventType, HEvent } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import { getAllVisited } from "../../realm/controllers/visited.controller";
import { isEqualDay } from "../../utils/dateutils";
import { eventAction } from "../slices/eventSlice";


export default [
    takeLatest(eventAction.getAllEvent.type, getAllEventSaga),
    takeLatest(eventAction.getEventInMonth.type, getEventInMonthSaga),
]

function* getAllEventSaga() {
    try {
        showLoading()
        let events: Array<HEvent> = []
        //@ts-ignore
        let allVisited = yield call(getAllVisited)
        let temp: boolean = false
        allVisited.forEach((element: any) => {
            console.log(`element`, element)
            events.forEach((event) => {
                if (isEqualDay(event.date, element.date)) {
                    event.event.push({ ...element, type: EventType.VISITED })
                    temp = true
                }
            })
            if (!temp) {
                events.push({ date: element.date, event: [{ ...element, type: EventType.VISITED }] })
            }
            temp = false
        })
        yield put(eventAction.getAllEventSuccess({ all: events }))
    } catch (error) {
        console.log("🚀 ~ file: eventSaga.ts ~ line 22 ~ function*getAllEventSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Không thể lấy dữ liệu')
    } finally {
        hideLoading()
    }
}

function* getEventInMonthSaga() {

}
