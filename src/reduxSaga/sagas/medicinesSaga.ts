import {call, put, takeLatest} from 'redux-saga/effects';
import {AlertType, Medicine} from '../../common';
import {showAlert} from '../../components/HAlert';
import {hideLoading, showLoading} from '../../components/Loading';
import {
  addMedicine,
  deleteMedicine,
  searchMedicine,
  getMedicine,
  updateMedicine,
  updateMedicines,
  updateSchedule,
} from '../../realm/controllers/medicine.controller';
import NotifiSchedule from '../../utils/Notifi';
import {medicinesAction} from '../slices/medicinesSlice';

export default [
  takeLatest(medicinesAction.searchMedicine.type, searchMedicineSaga),
  takeLatest(medicinesAction.getMedicine.type, getMedicineSaga),
  takeLatest(medicinesAction.addMedicine.type, addMedicineSaga),
  takeLatest(medicinesAction.updateSchedule.type, updateScheduleSaga),

  takeLatest(medicinesAction.updateMedicine.type, updateMedicineSaga),
  takeLatest(medicinesAction.deleteMedicine.type, deleteMedicineSaga),
  takeLatest(
    medicinesAction.getAllMedicineOfVisited.type,
    getAllMedicineOfVisitedSaga,
  ),
  takeLatest(
    medicinesAction.updateAllMedicineOfVisited.type,
    updateAllMedicineOfVisitedSaga,
  ),
  takeLatest(medicinesAction.getMedicines.type, getMedicinesSaga),
];

function* searchMedicineSaga({payload}: any) {
  const {keyword, index} = payload;
  try {
    showLoading();
    //@ts-ignore
    const allMedicine = yield call(searchMedicine, keyword, index);
    // console.log(`allMedicine-saga`, allMedicine)
    yield put(
      medicinesAction.searchMedicineSuccess({listMedicine: allMedicine}),
    );
  } catch (error) {
    showAlert(AlertType.FAIL, 'Không thể lấy danh sách thuốc');
    console.log(
      '🚀 ~ file: medicineSaga.ts ~ line 18 ~ function*getAllMedicineSaga ~ error',
      error,
    );
  } finally {
    hideLoading();
  }
}
function* addMedicineSaga(action: any) {
  try {
    const {medicine} = action.payload;
    showLoading();
    //@ts-ignore
    const result = yield call(addMedicine, medicine);
    if (result == false) {
      showAlert(AlertType.FAIL, 'Thuốc đã có');
    }
    // NotifiSchedule.genNotifiSchedule(medicine)
    //tạm thời thì sau khi thêm thì add luôn víited kia vào visitedState
  } catch (error) {
    console.log(
      '🚀 ~ file: medicineSaga.ts ~ line 41 ~ function*addMedicineSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không thể thêm');
  } finally {
    hideLoading();
  }
}
function* updateMedicineSaga(action: any) {
  try {
    const medicine = action.payload;
    showLoading();
    yield call(updateMedicine, medicine);
    yield put(medicinesAction.updateMedicineSuccess({medicine}));
  } catch (error) {
    console.log(
      '🚀 ~ file: medicineSaga.ts ~ line 54 ~ function*updateMedicineSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không thể cập nhật');
  } finally {
    hideLoading();
  }
}
function* deleteMedicineSaga(action: any) {
  try {
    showLoading();
    const _id = action.payload;
    yield call(deleteMedicine, _id);
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

function* getAllMedicineOfVisitedSaga() {
  try {
    showLoading();
  } catch (error) {
  } finally {
    hideLoading();
  }
}

function* updateAllMedicineOfVisitedSaga(action: any) {
  const medicines: Array<Medicine> = action.payload;
  try {
    showLoading();
    yield call(updateMedicines, medicines);
  } catch (error) {
    console.log(
      '🚀 ~ file: visitedSaga.ts ~ line 96 ~ function*deleteVisitedSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'cập nhật danh sách thuốc không thành công!');
  } finally {
    hideLoading();
  }
}

function* getMedicineSaga({payload}: any) {
  try {
    showLoading();
    const _id = payload;
    let medicine;
    if (_id == null || _id == undefined) {
      medicine = null;
    } else {
      //@ts-ignore
      medicine = yield call(getMedicine, _id);
    }

    yield put(medicinesAction.getMedicineSuccess({medicine}));
  } catch (error) {
    console.log(
      '🚀 ~ file: medicinesSaga.ts ~ line 107 ~ function*getMedicineSaga ~ error',
      error,
    );
    showAlert(AlertType.FAIL, 'Không lấy được thông tin thuốc!');
  } finally {
    hideLoading();
  }
}

function* getMedicinesSaga({payload}: any) {
  try {
    const arrayId = payload;
    if (arrayId.length == 0) {
      yield put(medicinesAction.getMedicinesSuccess({medicines: []}));
    } else {
      //@ts-ignore
      let medicines = yield call(_getMedicines, arrayId);
      yield put(medicinesAction.getMedicinesSuccess({medicines}));
    }
  } catch (error) {}
}

const _getMedicines = async (arrayId: Array<number>) => {
  try {
    let medicines = await Promise.all(
      arrayId.map(async value => {
        const medicine = await getMedicine(value);
        return medicine;
      }),
    );
    return medicines;
  } catch (error) {
    throw error;
  }
};

function* updateScheduleSaga({payload}: any) {
  try {
    const {_id, schedule} = payload;
    showLoading();
    yield call(updateSchedule, _id, schedule);
    // @ts-ignore
    const medicine = yield call(getMedicine, _id);
    NotifiSchedule.genNotifiSchedule(schedule, medicine);
  } catch (error) {
    console.log(
      '🚀 ~ file: medicinesSaga.ts ~ line 191 ~ function*updateScheduleSaga ~ error',
      error,
    );
  } finally {
    hideLoading();
  }
}
