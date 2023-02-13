import {call, put, takeLatest} from 'redux-saga/effects';
import {AlertType} from '../../common';
import {showAlert} from '../../components/HAlert';
import {hideLoading, showLoading} from '../../components/Loading';
import {
  addLocation,
  getLocation,
  searchLocation,
  deleteLocation,
} from '../../realm/controllers/location.controller';
import {locationAction} from '../slices/locationSlice';

export default [
  takeLatest(locationAction.searchLocation.type, searchLocationSaga),
  takeLatest(locationAction.addLocation.type, addLocationSaga),
  takeLatest(locationAction.getLocation.type, getLocationSaga),
  takeLatest(locationAction.deleteLocation.type, deleteLocationSaga),
];

function* searchLocationSaga({payload}: any) {
  const {keyword, index} = payload;
  try {
    showLoading();
    //@ts-ignore
    const listLocation = yield call(searchLocation, keyword, index);
    yield put(
      locationAction.searchLocationSuccess({listLocation: [...listLocation]}),
    );
  } catch (error) {
    console.log(
      '🚀 ~ file: locationSaga.ts ~ line 26 ~ function*searchLocationSaga ~ error',
      error,
    );
  } finally {
    hideLoading();
  }
}

function* addLocationSaga({payload}: any) {
  try {
    showLoading();
    const location = payload;
    //@ts-ignore
    const result = yield call(addLocation, location);
    if (result == false) {
      showAlert(AlertType.FAIL, 'Địa điểm khám đã có');
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: locationSaga.ts ~ line 16 ~ function*addLocationSaga ~ error',
      error,
    );
  } finally {
    hideLoading();
  }
}

function* getLocationSaga({payload}: any) {
  try {
    const _id = payload;
    //@ts-ignore
    const location = yield call(getLocation, _id);
    yield put(locationAction.getLocationSuccess({location}));
  } catch (error) {}
}

function* deleteLocationSaga({payload}: any) {
  try {
    showLoading();
    const _id = payload;
    yield call(deleteLocation, _id);
  } catch (error) {
    console.log(
      '🚀 ~ file: visitedSaga.ts ~ line 67 ~ function*deleteVisitedSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không xoá được');
  } finally {
    hideLoading();
  }
}
