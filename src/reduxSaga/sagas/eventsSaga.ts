import {put, takeLatest, call} from 'redux-saga/effects';
import {
  AlertType,
  EventType,
  HEvent,
  HEventMedicine,
  HEventVisited,
  Medicine,
  SearchType,
  TYPE_SHOW,
} from '../../common';
import {showAlert} from '../../components/HAlert';
import {hideLoading, showLoading} from '../../components/Loading';
import {
  getAllMedicine,
  searchMedicine,
} from '../../realm/controllers/medicine.controller';
import {searchVisited} from '../../realm/controllers/visited.controller';
import {isEqualDay, setHoursMinutes} from '../../utils/dateutils';
import {eventsAction, eventsReducer} from '../slices/eventsSlice';

export default [
  takeLatest(eventsAction.getListEvent.type, getListEventSaga),
  takeLatest(eventsAction.getEventInMonth.type, getEventInMonthSaga),
  takeLatest(eventsAction.searchEvent.type, searchEventSaga),
];

function* getListEventSaga({payload}: any) {
  try {
    const {type, date} = payload;
    let events: Array<HEvent> = [];
    let listEventMedicine;
    showLoading();
    switch (type) {
      case TYPE_SHOW.VISITED:
        //@ts-ignore
        events = yield call(_getEventVisited, undefined, undefined, date);
        break;
      case TYPE_SHOW.MEDICINE:
        //@ts-ignore
        events = yield call(_getEventMedicine, undefined, undefined, undefined);
        break;
      default:
        events = yield call(_getEventVisited, undefined, undefined, date);
        //@ts-ignore
        listEventMedicine = yield call(_getEventMedicine);
        listEventMedicine.forEach((eventMedicine: any) => {
          let index = events.findIndex(event =>
            isEqualDay(event.date, eventMedicine.date),
          );
          if (index >= 0) {
            events[index].event = [
              ...events[index].event,
              ...eventMedicine.event,
            ];
          } else {
            events.push(eventMedicine);
          }
        });
        break;
    }

    // sắp xếp lại các event theo thứ tự thời gian
    events.forEach(value => {
      //@ts-ignore
      value?.event?.sort((a, b) => a.date.getTime() - b.date.getTime());
    });
    yield put(eventsAction.getListEventSuccess({listEvent: events}));
  } catch (error: any) {
    console.log(
      '🚀 ~ file: eventsSaga.ts ~ line 99 ~ function*getAllEventSaga ~ error',
      error.message,
    );
    showAlert(AlertType.FAIL, 'Không thể lấy dữ liệu');
  } finally {
    hideLoading();
  }
}

const _getEventVisited = async (
  keyword: string | undefined | null,
  index: number | null | undefined,
  date: Date | null | undefined,
) => {
  try {
    let events: Array<HEvent> = [];
    //lấy tất cả visited để xếp vào list event
    //@ts-ignore
    let allVisited = await searchVisited(keyword ?? '', index, date);
    allVisited.forEach(element => {
      let eTemp: HEventVisited = {
        _id: element._id,
        date: new Date(element.date),
        descript: element.descript,
        location: element.location?.name,
        title: element.title,
        type: EventType.VISITED,
      };
      let index = events.findIndex(event =>
        isEqualDay(event.date, element.date),
      );
      if (index >= 0) {
        events[index].event.push(eTemp);
      } else {
        events.push({date: new Date(element.date), event: [eTemp]});
      }
    });
    return events;
  } catch (error: any) {
    console.log(
      '🚀 ~ file: eventsSaga.ts ~ line 142 ~ const_getEventVisited= ~ error',
      error,
    );
    return [];
  }
};

const _getEventMedicine = async (
  keyword: string | null | undefined,
  index: number | null | undefined,
  date: Date | null | undefined,
) => {
  try {
    let events: Array<HEvent> = [];
    //lấy tất cả các thuốc uống để ren ra event
    //@ts-ignore
    let allMedicines = await searchMedicine(keyword, index);
    // console.log('allMedicines', JSON.stringify(allMedicines));
    let eventMedicines: Array<HEventMedicine> = [];
    allMedicines.forEach((medicine: Medicine) => {
      medicine.schedules.forEach(schedule => {
        for (let i = 0; i < schedule.during; ++i) {
          let currDate = new Date(schedule.start);
          currDate.setDate(currDate.getDate() + i);
          // console.log(`currDate`, currDate)
          schedule.reminds.forEach(remind => {
            if (remind.repeat) {
              eventMedicines.push({
                _id: medicine._id,
                title: medicine.title,
                type: EventType.MEDICINE,
                visitedId: schedule.visitedId,
                time: setHoursMinutes(currDate, remind.time),
                date: currDate,
                amount: remind.amount,
                descript: remind.descript,
              });
            } else if (i == 0) {
              eventMedicines.push({
                _id: medicine._id,
                title: medicine.title,
                type: EventType.MEDICINE,
                visitedId: schedule.visitedId,
                time: setHoursMinutes(currDate, remind.time),
                date: currDate,
                amount: remind.amount,
                descript: remind.descript,
              });
            }
          });
        }
      });
    });
    eventMedicines.forEach((eMedicine: any) => {
      let index = events.findIndex(event =>
        isEqualDay(event.date, eMedicine.date),
      );
      if (index >= 0) {
        events[index].event.push(eMedicine);
      } else {
        events.push({date: eMedicine.date, event: [eMedicine]});
      }
    });
    console.log('events', events);
    return events;
  } catch (error: any) {
    console.log(
      '🚀 ~ file: eventsSaga.ts ~ line 152 ~ const_getEventMedicine= ~ error',
      error,
    );
    return [];
  }
};

function getAllEventInMonth({payload}: any) {
  try {
    showLoading();
  } catch (error) {
  } finally {
    hideLoading();
  }
}

// const addEvent = (event: HEventMedicine | HEventVisited) => {

// }
function* searchEventSaga({payload}: any) {
  try {
    const keyword: string = payload.keyword;
    const type: SearchType = payload.searchType;
    let events: Array<HEvent> = [];
    let listEventMedicine;
    if (keyword == '') {
      yield put(eventsAction.searchEventSuccess({searchResult: events}));
      return;
    }
    showLoading();
    switch (type) {
      case SearchType.VISITED:
        //@ts-ignore
        events = yield call(_getEventVisited, keyword, undefined, undefined);
        break;
      case SearchType.MEDICINE:
        //@ts-ignore
        events = yield call(_getEventMedicine, keyword, undefined, undefined);
        break;
      default:
        events = yield call(_getEventVisited, keyword, undefined, undefined);
        //@ts-ignore
        listEventMedicine = yield call(_getEventMedicine, keyword, undefined, undefined);
        listEventMedicine.forEach((eventMedicine: any) => {
          let index = events.findIndex(event =>
            isEqualDay(event.date, eventMedicine.date),
          );
          if (index >= 0) {
            events[index].event = [
              ...events[index].event,
              ...eventMedicine.event,
            ];
          } else {
            events.push(eventMedicine);
          }
        });
        break;
    }

    // sắp xếp lại các event theo thứ tự thời gian
    events.forEach(value => {
      //@ts-ignore
      value?.event?.sort((a, b) => a.date.getTime() - b.date.getTime());
    });
    yield put(eventsAction.searchEventSuccess({searchResult: events}));
  } catch (error) {
    console.log(
      '🚀 ~ file: eventsSaga.ts ~ line 134 ~ function*searchEventSaga ~ error',
      error,
    );
    showAlert(
      AlertType.FAIL,
      'Chức năng tìm kiếm tạm thời bị lỗi, vui lòng thử lại sau!',
    );
  } finally {
    hideLoading();
  }
}

function* getEventInMonthSaga() {}

/** Tìm kiếm event thuốc dựa theo tên thuốc hoặc id
 * @param keyword Tên thuốc hoặc _id
 * @returns Mảng các thuốc
 */
const _searchMedicine = async (keyword: String) => {
  // console.log("searchMedicine")
  try {
    let result = await searchMedicine(keyword);
    let events: Array<HEvent> = [];
    //@ts-ignore
    result.forEach((medicine: Medicine) => {
      // console.log(`element`, element, { ...element, type: EventType.VISITED })
      let eventMedicines: Array<HEventMedicine> = [];
      for (let i = 0; i < medicine.during; ++i) {
        let currDate = new Date(medicine.start);
        currDate.setDate(currDate.getDate() + i);
        medicine.remind.forEach(remind => {
          if (remind.repeat) {
            eventMedicines.push({
              _id: medicine._id,
              title: medicine.title,
              type: EventType.MEDICINE,
              visitedId: medicine.visitedId,
              time: setHoursMinutes(currDate, remind.time),
              date: currDate,
              amount: remind.amount,
              descript: remind.descript,
            });
          } else if (i == 0) {
            eventMedicines.push({
              _id: medicine._id,
              title: medicine.title,
              type: EventType.MEDICINE,
              visitedId: medicine.visitedId,
              time: setHoursMinutes(currDate, remind.time),
              date: currDate,
              amount: remind.amount,
              descript: remind.descript,
            });
          }
        });
      }
      eventMedicines.forEach(eMedicine => {
        let index = events.findIndex(event =>
          isEqualDay(event.date, eMedicine.date),
        );
        if (index >= 0) {
          events[index].event.push(eMedicine);
        } else {
          events.push({date: eMedicine.date, event: [eMedicine]});
        }
      });
    });
    return events;
  } catch (error) {
    console.log(
      '🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error',
      error,
    );
  }
};

/**Tìm kiếm các visited dựa theo tên hoặc id
 * @param keyword Tên sự kiện khám hoặc _id hoặc địa điểm hoặc ghi chú
 * @returns Mảng các sự kiện khám
 */
const _searchVisited = async (keyword: String) => {
  // console.log("searchVisited")
  try {
    let result = await searchVisited(keyword);
    let events: Array<HEvent> = [];
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
      };

      let index = events.findIndex(event =>
        isEqualDay(event.date, element.date),
      );
      if (index >= 0) {
        events[index].event.push(eTemp);
      } else {
        events.push({date: element.date, event: [eTemp]});
      }
    });

    return events;
  } catch (error) {
    console.log(
      '🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error',
      error,
    );
  }
};

/**Tìm kiếm tất cả dựa theo từ khoá */
const _searchAll = async (keyword: String) => {
  try {
    let events: Array<HEvent> = [];
    let visiteds = await searchVisited(keyword);
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
      };

      let index = events.findIndex(event =>
        isEqualDay(event.date, element.date),
      );
      if (index >= 0) {
        events[index].event.push(eTemp);
      } else {
        events.push({date: element.date, event: [eTemp]});
      }
    });
    let medicines = await searchMedicine(keyword);
    // console.log(`medicines`, medicines)
    //@ts-ignore
    medicines.forEach((medicine: Medicine) => {
      // console.log(`element`, element, { ...element, type: EventType.VISITED })
      let eventMedicines: Array<HEventMedicine> = [];
      for (let i = 0; i < medicine.during; ++i) {
        let currDate = new Date(medicine.start);
        currDate.setDate(currDate.getDate() + i);
        medicine.remind.forEach(remind => {
          if (remind.repeat) {
            eventMedicines.push({
              _id: medicine._id,
              title: medicine.title,
              type: EventType.MEDICINE,
              visitedId: medicine.visitedId,
              time: setHoursMinutes(currDate, remind.time),
              date: currDate,
              amount: remind.amount,
              descript: remind.descript,
            });
          } else if (i == 0) {
            eventMedicines.push({
              _id: medicine._id,
              title: medicine.title,
              type: EventType.MEDICINE,
              visitedId: medicine.visitedId,
              time: setHoursMinutes(currDate, remind.time),
              date: currDate,
              amount: remind.amount,
              descript: remind.descript,
            });
          }
        });
      }
      eventMedicines.forEach(eMedicine => {
        let index = events.findIndex(event =>
          isEqualDay(event.date, eMedicine.date),
        );
        if (index >= 0) {
          events[index].event.push(eMedicine);
        } else {
          events.push({date: eMedicine.date, event: [eMedicine]});
        }
      });
    });
    return events;
  } catch (error) {
    console.log(
      '🚀 ~ file: eventsSaga.ts ~ line 152 ~ searchMedicine ~ error',
      error,
    );
  }
};
