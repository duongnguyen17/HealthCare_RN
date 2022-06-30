import { put, takeLatest, call } from "redux-saga/effects";
import { AlertType, STORAGE_KEY } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import { CODE } from "../../services/api/constant";
import HAxios from "../../services/api/HAxios";
import { login, signup, verifyToken } from "../../services/api/Request";
import { ProcessResponseType } from "../../type/type";
import Storage from "../../utils/Storage";
import { authAction } from "../slices/authSlice";



export default [
    takeLatest(authAction.login.type, loginSaga),
    takeLatest(authAction.logout.type, logoutSaga),
    takeLatest(authAction.verifyToken.type, verifyTokenSaga),
    takeLatest(authAction.signup.type, signupSaga)
]

function* loginSaga(action: any) {
    try {
        showLoading()
        const params = action.payload

        if (params?.type == 'phone') {
            const response: ProcessResponseType = yield call(login, { phoneNumber: params.phoneNumber!, password: params.password! })
            if (response.code === CODE.OK) {
                yield _saveAuthInformation(response?.data)
                // yield put(authActions.getMeRequest())
                yield put(authAction.loginSuccess({ isLogin: true, _id: response?.data?._id }))
                showAlert(AlertType.SUCCESS, `Đăng nhập thành công, Health Care xin chào`)
            } else {
                showAlert(AlertType.FAIL, `Đăng nhập thất bại`, 1000)
            }

        } else {
            // const { error, data } = yield thirdPartLogin(params.type)
            // if (data.access_token) {
            //     yield saveAuthInformation(data)
            //     yield put(authActions.getMeRequest())
            //     // selfLearningActions.requestKnowledgeTrees()
            // }
        }
    } catch (error: any) {
        console.log("🚀 ~ file: authSaga.ts ~ line 53 ~ function*loginSaga ~ error", error.message)
        showAlert(AlertType.FAIL, 'Đã xảy ra lỗi khi đăng nhập')
    } finally {
        hideLoading()
    }
}

function* logoutSaga() {
    try {
        showLoading()
        yield _deleteAuthInformation()
        yield put(authAction.logoutSuccess())
    } catch (error) {
        console.log("🚀 ~ file: authSaga.ts ~ line 64 ~ function*logoutSaga ~ error", error)
        showAlert(AlertType.FAIL, 'Đã xảy ra lỗi khi đăng nhập')
    }
    finally {
        hideLoading()
    }

}

function* verifyTokenSaga(action: any) {
    try {
        showLoading()

        //@ts-ignore
        const token = yield Storage.getItem(STORAGE_KEY.TOKEN)
        //@ts-ignore
        const refreshToken = yield Storage.getItem(STORAGE_KEY.REFRESH_TOKEN)
        if ((token != null || token != undefined) && (refreshToken != null || refreshToken != undefined)) {
            HAxios.defaults.headers.common['Authorization'] = token
            //@ts-ignore
            const res = yield call(verifyToken, { refreshToken })
            if (res?.code == CODE.OK)
                yield put(authAction.verifyTokenSuccess({ isLogin: true, _id: res.data?._id }))
            else { throw Error(res.message) }
        }
        else yield put(authAction.verifyTokenSuccess({ isLogin: false }))

    } catch (error) {
        console.log("🚀 ~ file: authSaga.ts ~ line 94 ~ function*verifyTokenSaga ~ error", error)
    }
    finally {
        hideLoading()
    }

}

function* signupSaga({ payload }: any) {
    try {
        showLoading()

        const response: ProcessResponseType = yield signup({ phoneNumber: payload?.phoneNumber!, password: payload?.password! })
        if (response?.code !== CODE.OK) {
            showAlert(AlertType.FAIL, response?.message)
        }
        else {
            yield _saveAuthInformation(response?.data)
            // yield put(authActions.getMeRequest())
            yield put(authAction.loginSuccess({ isLogin: true, _id: response?.data?._id }))
            showAlert(AlertType.SUCCESS, `Đăng nhập thành công, Health Care xin chào`)
        }

    } catch (error) {

    }
    finally {
        hideLoading()
    }

}
const _saveAuthInformation = async (data: any) => {
    const BearerToken = `Bearer ${data.token}`
    HAxios.defaults.headers.common['Authorization'] = BearerToken

    // save token in sinfo
    await Storage.setItem(STORAGE_KEY.IS_LOGIN, true)
    await Storage.setItem(STORAGE_KEY.TOKEN, BearerToken)
    await Storage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken)
}


const _deleteAuthInformation = async () => {
    await Storage.setItem(STORAGE_KEY.IS_LOGIN, false)
    await Storage.setItem(STORAGE_KEY.TOKEN, null)
    await Storage.setItem(STORAGE_KEY.REFRESH_TOKEN, null)
}