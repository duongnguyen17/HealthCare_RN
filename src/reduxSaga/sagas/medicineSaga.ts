import { takeLatest, call, put, select, take } from 'redux-saga/effects'
import { AlertType, Medicine } from '../../common'
import { showAlert } from '../../components/HAlert'

import { hideLoading, showLoading } from '../../components/Loading'
import { addMedicine, deleteMedicine, getAllMedicine, updateMedicine, updateMedicines } from '../../realm/controllers/medicine.controller'
import { medicineAction } from '../slices/medicineSlice'


export default [
    takeLatest(medicineAction.getAllMedicine.type, getAllMedicineSaga),
    takeLatest(medicineAction.addMedicine.type, addMedicineSaga),
    takeLatest(medicineAction.updateMedicine.type, updateMedicineSaga),
    takeLatest(medicineAction.deleteMedicine.type, deleteMedicineSaga),
    takeLatest(medicineAction.getAllMedicineOfVisited.type, getAllMedicineOfVisitedSaga),
    takeLatest(medicineAction.updateAllMedicineOfVisited.type, updateAllMedicineOfVisitedSaga)
]

function* getAllMedicineSaga(action: any) {
    try {
        showLoading()
        //@ts-ignore
        const allMedicine = yield call(getAllMedicine)
        // console.log(`allMedicine-saga`, allMedicine)
        yield put(medicineAction.getAllMedicineSuccess({ all: [...allMedicine] }))
    } catch (error) {
        showAlert(AlertType.FAIL, 'Không thể lấy danh sách thuốc')
        console.log("🚀 ~ file: medicineSaga.ts ~ line 18 ~ function*getAllMedicineSaga ~ error", error)
    } finally {
        hideLoading()
    }
}
function* addMedicineSaga(action: any) {
    try {
        const medicine = action.payload
        // console.log(`visited`, visited)
        showLoading()
        yield call(addMedicine, medicine)

        //tạm thời thì sau khi thêm thì add luôn víited kia vào víitedState
        yield put(medicineAction.addMedicineSuccess({ medicine }))
    } catch (error) {
        console.log("🚀 ~ file: medicineSaga.ts ~ line 41 ~ function*addMedicineSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Không thể thêm')
    } finally {
        hideLoading()
    }
}
function* updateMedicineSaga(action: any) {
    try {
        const medicine = action.payload
        showLoading()
        yield call(updateMedicine, medicine)
        yield put(medicineAction.updateMedicineSuccess({ medicine }))
    } catch (error) {
        console.log("🚀 ~ file: medicineSaga.ts ~ line 54 ~ function*updateMedicineSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Không thể cập nhật')
    } finally {
        hideLoading()
    }
}
function* deleteMedicineSaga(action: any) {
    try {
        showLoading()
        const _id = action.payload
        yield call(deleteMedicine, _id)
        yield put(medicineAction.deleteMedicineSuccess(_id))
    } catch (error) {
        console.log("🚀 ~ file: visitedSaga.ts ~ line 67 ~ function*deleteVisitedSaga ~ error", error)
        showAlert(AlertType.FAIL, "Không xoá được")
    } finally {
        hideLoading()
    }
}

function* getAllMedicineOfVisitedSaga() {
    try {
        showLoading()


    } catch (error) {

    }
    finally {
        hideLoading()
    }
}

function* updateAllMedicineOfVisitedSaga(action: any) {
    const medicines: Array<Medicine> = action.payload;
    try {
        showLoading()
        yield call(updateMedicines, medicines)
    } catch (error) {
        console.log("🚀 ~ file: visitedSaga.ts ~ line 96 ~ function*deleteVisitedSaga ~ error", error)
        showAlert(AlertType.FAIL, "cập nhật danh sách thuốc không thành công!")
    } finally {
        hideLoading()
    }
}