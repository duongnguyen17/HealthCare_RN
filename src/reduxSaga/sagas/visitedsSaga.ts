import {call, put, takeLatest} from 'redux-saga/effects';
import {AlertType} from '../../common';
import {showAlert} from '../../components/HAlert';
import {hideLoading, showLoading} from '../../components/Loading';
import {getLocation} from '../../realm/controllers/location.controller';
import {
  addVisited,
  deleteVisited,
  searchVisited,
  updateVisited,
  getVisited,
} from '../../realm/controllers/visited.controller';
import NotifiSchedule from '../../utils/Notifi';
import {visitedsAction} from '../slices/visitedsSlice';

export default [
  takeLatest(visitedsAction.searchVisited.type, searchVisitedSaga),
  takeLatest(visitedsAction.getVisted.type, getVisitedSaga),
  takeLatest(visitedsAction.addVisited.type, addVisitedSaga),
  takeLatest(visitedsAction.updateVisited.type, updateVisitedSaga),
  takeLatest(visitedsAction.deleteVisited.type, deleteVisitedSaga),
];

function* searchVisitedSaga(action: any) {
  const {keyword, index} = action?.payload;
  try {
    showLoading();
    //@ts-ignore
    const allVisited = yield call(searchVisited, keyword, index);
    yield put(visitedsAction.searchVisitedSuccess({listVisited: allVisited}));
  } catch (error) {
    console.log(
      '🚀 ~ file: visitedSaga.ts ~ line 23 ~ function*searchVisitedSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không thể lấy danh sách lần khám');
  } finally {
    hideLoading();
  }
}
function* addVisitedSaga(action: any) {
  try {
    const visited = action.payload;
    console.log(`visited`, visited);
    showLoading();
    yield call(addVisited, visited);
    if (visited.location != null && visited != undefined) {
      //@ts-ignore
      const location = yield call(getLocation, visited.location);
      visited.location = location?.name;
    }
    NotifiSchedule.genNotifiVisited(visited);
  } catch (error) {
    console.log(
      '🚀 ~ file: visitedSaga.ts ~ line 40 ~ function*addVisitedSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không thể thêm');
  } finally {
    hideLoading();
  }
}
function* updateVisitedSaga(action: any) {
  try {
    const visited = action.payload;
    showLoading();
    yield call(updateVisited, visited);
    yield put(visitedsAction.updateVisitedSuccess({visited}));
  } catch (error) {
    console.log(
      '🚀 ~ file: visitedSaga.ts ~ line 53 ~ function*updateVisitedSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không thể cập nhật');
  } finally {
    hideLoading();
  }
}

function* deleteVisitedSaga(action: any) {
  try {
    showLoading();
    const _id = action.payload;
    yield call(deleteVisited, _id);
  } catch (error) {
    console.log(
      '🚀 ~ file: visitedsSaga.ts ~ line 82 ~ function*deleteVisitedSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không xoá được');
  } finally {
    hideLoading();
  }
}

function* getVisitedSaga({payload}: any) {
  try {
    showLoading();
    const _id = payload;
    //@ts-ignore
    let visited = yield call(getVisited, _id);
    yield put(visitedsAction.getVisitedSuccess({visited}));
  } catch (error) {
    console.log(
      '🚀 ~ file: visitedsSaga.ts ~ line 83 ~ function*getVisitedSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không lấy được thông tin lần khám!');
  } finally {
    hideLoading();
  }
}
