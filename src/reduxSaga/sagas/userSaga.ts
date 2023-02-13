import {call, put, takeLatest} from 'redux-saga/effects';
import {AlertType} from '../../common';
import {showAlert} from '../../components/HAlert';
import {hideLoading, showLoading} from '../../components/Loading';
import {
  getUserProfile,
  updateUserProfile,
} from '../../realm/controllers/user.controller';
import {CODE, MESSAGE} from '../../services/api/constant';

import {userAction} from '../slices/userSlice';

export default [
  takeLatest(userAction.getUserProfile.type, getProfileSaga),
  takeLatest(userAction.updateUserProfile.type, updateUserProfileSaga),
];

function* getProfileSaga({payload}: any) {
  try {
    showLoading();
    // @ts-ignore
    // let res = yield call(getProfile)
    // console.log('res', res)
    // if (res.code === CODE.OK) {
    //     yield put(userAction.getUserProfileSuccess({ _id: res.data._id, ...res.data.customInfor }))
    // } else {
    //     throw Error(res.message)
    // }
    const _id = payload;
    //@ts-ignore
    const user = yield call(getUserProfile, _id);
    // console.log('user', user);
    yield put(userAction.getUserProfileSuccess(user));
  } catch (error: any) {
    console.log('ERROR - getProfileSaga', error.message);
  } finally {
    hideLoading();
  }
}

function* updateUserProfileSaga({payload}: any) {
  console.log('payload', payload);
  try {
    showLoading();
    //@ts-ignore
    // let res = yield call(updateUserProfile, payload.customInfor);
    let customInfor = yield call(updateUserProfile, payload.customInfor);
    // console.log('updateUserProfileSaga', customInfor);
    if (customInfor !== false) {
      yield put(userAction.updateUserProfileSuccess(customInfor));
    } else {
      showAlert(AlertType.FAIL, 'Không cập nhật được thông tin người dùng');
      throw Error('Không cập nhật được thông tin người dùng');
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: userSaga.ts ~ line 46 ~ function*updateUserProfileSaga ~ error',
      error,
    );
  } finally {
    hideLoading();
  }
}
