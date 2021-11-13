import { takeLatest } from '@redux-saga/core/effects'
import { AnyAction } from 'redux'
import { hideLoading, showLoading } from '../../components/Loading'
import { testAction } from '../slices/testSlice'

export default [
  takeLatest(testAction.increment.type, test)
]

function* test(action: AnyAction) {
  try {
    console.log("testSaga")
    showLoading()
  } catch (error) {
  } finally {
    hideLoading()
  }
}