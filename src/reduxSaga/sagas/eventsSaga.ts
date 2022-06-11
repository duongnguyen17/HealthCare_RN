import { put, takeLatest, call } from "redux-saga/effects";
import { AlertType, EventType, HEvent, HEventMedicine, HEventVisited, Medicine, SearchType } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import { getAllMedicine, searchMedicine } from "../../realm/controllers/medicine.controller";
import { getAllVisited, searchVisited } from "../../realm/controllers/visited.controller";
import { isEqualDay, setHoursMinutes } from "../../utils/dateutils";
import { eventsAction } from "../slices/eventsSlice";


export default [
    takeLatest(eventsAction.getAllEvent.type, getAllEventSaga),
    takeLatest(eventsAction.getEventInMonth.type, getEventInMonthSaga),
    takeLatest(eventsAction.searchEvent.type, searchEventSaga)
]

function* getAllEventSaga() {
    try {
        showLoading()
        let events: Array<HEvent> = []

        //lấy tất cả visited để xếp vào list event
        //@ts-ignore
        let allVisited = yield call(getAllVisited)
        allVisited.forEach((element: any) => {
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
        // console.log(`allMedicines-eventSaga`, [...allMedicines[0].remind])
        allMedicines.forEach((medicine: Medicine) => {
            // console.log(`element`, element, { ...element, type: EventType.VISITED })
            let eventMedicines: Array<HEventMedicine> = []
            for (let i = 0; i < medicine.during; ++i) {
                let currDate = new Date(medicine.start)
                currDate.setDate(currDate.getDate() + i)
                // console.log(`currDate`, currDate)
                medicine.remind.forEach((remind) => {
                    if (remind.repeat) {
                        eventMedicines.push({
                            _id: medicine._id,
                            title: medicine.title,
                            type: EventType.MEDICINE,
                            visitedId: medicine.visitedId,
                            time: setHoursMinutes(currDate, remind.time),
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
                            time: setHoursMinutes(currDate, remind.time),
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

            // sắp xếp lại các event theo thứ tự thời gian
            events.forEach((value, index) => {
                //@ts-ignore
                value.event.sort((a, b) => a.date - b.date)
            })
        })

        yield put(eventsAction.getAllEventSuccess({ all: events }))
    } catch (error: any) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 99 ~ function*getAllEventSaga ~ error", error.message)
        showAlert(AlertType.FAIL, 'Không thể lấy dữ liệu')
    } finally {
        hideLoading()
    }
}

function getAllEventInMonth({ payload }: any) {
    try {
        showLoading()
        
    } catch (error) {
        
    }
    finally{
        hideLoading()
    }
}


// const addEvent = (event: HEventMedicine | HEventVisited) => {

// }
function* searchEventSaga({ payload }: any) {
    try {
        showLoading()
        const keyword: String = payload.keyword
        const searchType: SearchType = payload.searchType
        let searchResult: Array<HEvent> = []
        if (keyword == '') {
            yield put(eventsAction.searchEventSuccess({ searchResult }))
            return
        }
        switch (searchType) {
            case SearchType.MEDICINE:
                searchResult = yield call(_searchMedicine, keyword)
                break;
            case SearchType.VISITED:
                searchResult = yield call(_searchVisited, keyword)
                break;
            default:
                searchResult = yield call(_searchAll, keyword)
                break;
        }

        yield put(eventsAction.searchEventSuccess({ searchResult }))
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 134 ~ function*searchEventSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Chức năng tìm kiếm tạm thời bị lỗi, vui lòng thử lại sau!')
    } finally {
        hideLoading()
    }
}

function* getEventInMonthSaga() {

}


/** Tìm kiếm event thuốc dựa theo tên thuốc hoặc id
 * @param keyword Tên thuốc hoặc _id
 * @returns Mảng các thuốc
*/
const _searchMedicine = async (keyword: String) => {
    console.log("searchMedicine")
    try {
        let result = await searchMedicine(keyword);
        let events: Array<HEvent> = []
        //@ts-ignore
        result.forEach((medicine: Medicine) => {
            // console.log(`element`, element, { ...element, type: EventType.VISITED })
            let eventMedicines: Array<HEventMedicine> = []
            for (let i = 0; i < medicine.during; ++i) {
                let currDate = new Date(medicine.start)
                currDate.setDate(currDate.getDate() + i)
                medicine.remind.forEach((remind) => {
                    if (remind.repeat) {
                        eventMedicines.push({
                            _id: medicine._id,
                            title: medicine.title,
                            type: EventType.MEDICINE,
                            visitedId: medicine.visitedId,
                            time: setHoursMinutes(currDate, remind.time),
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
                            time: setHoursMinutes(currDate, remind.time),
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
        return events
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error", error)
    }
}

/**Tìm kiếm các visited dựa theo tên hoặc id 
 * @param keyword Tên sự kiện khám hoặc _id hoặc địa điểm hoặc ghi chú
 * @returns Mảng các sự kiện khám
*/
const _searchVisited = async (keyword: String) => {
    console.log("searchVisited")
    try {
        let result = await searchVisited(keyword)
        let events: Array<HEvent> = []
        //@ts-ignore
        result.forEach((element: any) => {
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

        return events
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error", error)
    }
}

/**Tìm kiếm tất cả dựa theo từ khoá */
const _searchAll = async (keyword: String) => {
    console.log("searchAll")
    try {
        let events: Array<HEvent> = []
        let visiteds = await searchVisited(keyword)
        // console.log(`visiteds`, visiteds)
        //@ts-ignore
        visiteds.forEach((element: any) => {
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
        let medicines = await searchMedicine(keyword)
        // console.log(`medicines`, medicines)
        //@ts-ignore
        medicines.forEach((medicine: Medicine) => {
            // console.log(`element`, element, { ...element, type: EventType.VISITED })
            let eventMedicines: Array<HEventMedicine> = []
            for (let i = 0; i < medicine.during; ++i) {
                let currDate = new Date(medicine.start)
                currDate.setDate(currDate.getDate() + i)
                medicine.remind.forEach((remind) => {
                    if (remind.repeat) {
                        eventMedicines.push({
                            _id: medicine._id,
                            title: medicine.title,
                            type: EventType.MEDICINE,
                            visitedId: medicine.visitedId,
                            time: setHoursMinutes(currDate, remind.time),
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
                            time: setHoursMinutes(currDate, remind.time),
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
        return events
    } catch (error) {
        console.log("🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error", error)
    }
}