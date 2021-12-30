import { put, takeLatest, call } from "redux-saga/effects";
import { AlertType, EventType, HEvent, HEventMedicine, HEventVisited, Medicine } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import { getAllMedicine } from "../../realm/controllers/medicine.controller";
import { getAllVisited } from "../../realm/controllers/visited.controller";
import { isEqualDay } from "../../utils/dateutils";
import { eventsAction } from "../slices/eventsSlice";


export default [
    takeLatest(eventsAction.getAllEvent.type, getAllEventSaga),
    takeLatest(eventsAction.getEventInMonth.type, getEventInMonthSaga),
]

function* getAllEventSaga() {
    try {
        showLoading()
        let events: Array<HEvent> = []

        //lấy tất cả visited để xếp vào list event
        //@ts-ignore
        let allVisited = yield call(getAllVisited)
        // console.log(`allVisited-eventsaga`, allVisited)
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

            let index = events.findIndex((event) => isEqualDay(event.date, element.date))
            if (index >= 0) {
                events[index].event.push(eTemp)
            }
            else {
                events.push({ date: element.date, event: [eTemp] })
            }
        })
        //lấy tất cả các thuốc uống để ren ra event
        //@ts-ignore
        let allMedicines = yield call(getAllMedicine)
        // console.log(`allMedicines-eventSaga`, allMedicines)
        allMedicines.forEach((medicine: Medicine) => {
            // console.log(`element`, element, { ...element, type: EventType.VISITED })
            let eventMedicines: Array<HEventMedicine> = []
            for (let i = 0; i < medicine.during; ++i) {
                let currDate = new Date()
                currDate.setDate(medicine.start.getDate() + i)
                medicine.remind.forEach((remind) => {
                    if (remind.repeat) {
                        eventMedicines.push({
                            _id: medicine._id,
                            title: medicine.title,
                            type: EventType.MEDICINE,
                            visitedId: medicine.visitedId,
                            time: remind.time,
                            date: currDate,
                            amount: remind.amount,
                            descript: remind.descript
                        })

                    }
                    else if (i == 0) {
                        eventMedicines.push({
                            _id: medicine._id,
                            title: medicine.title,
                            type: EventType.MEDICINE,
                            visitedId: medicine.visitedId,
                            time: remind.time,
                            date: currDate,
                            amount: remind.amount,
                            descript: remind.descript
                        })
                    }
                })
            }
            eventMedicines.forEach((eMedicine) => {
                let index = events.findIndex((event) => isEqualDay(event.date, eMedicine.date))
                if (index >= 0) {
                    events[index].event.push(eMedicine)
                } else {
                    events.push({ date: eMedicine.date, event: [eMedicine] })
                }
            })
        })

        // console.log(`events`, events[0].event)
        yield put(eventsAction.getAllEventSuccess({ all: events }))
    } catch (error) {
        console.log("🚀 ~ file: eventSaga.ts ~ line 83 ~ function*getAllEventSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Không thể lấy dữ liệu')
    } finally {
        hideLoading()
    }
}
const addEvent = (event: HEventMedicine | HEventVisited) => {

}

function* getEventInMonthSaga() {

}
