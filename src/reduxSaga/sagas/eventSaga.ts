import { put, takeLatest, call } from "redux-saga/effects";
import { AlertType, EventType, HEvent, HEventVisited } from "../../common";
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
            // console.log(`element`, element, { ...element, type: EventType.VISITED })

            let eTemp: HEventVisited = {
                _id: element._id,
                date: element.date,
                descript: element.descript,
                location: element.location,
                title: element.title,
                type: EventType.VISITED,
            }
            events.forEach((event) => {
                if (isEqualDay(event.date, element.date)) {
                    // event.event.push({ ...element, type: EventType.VISITED })
                    event.event.push(eTemp)
                    temp = true
                }
            })
            if (!temp) {
                // events.push({ date: element.date, event: [{ ...element, type: EventType.VISITED }] })
                events.push({ date: element.date, event: [eTemp] })
            }
            temp = false
        })
        // console.log(`events`, events[0].event)
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
