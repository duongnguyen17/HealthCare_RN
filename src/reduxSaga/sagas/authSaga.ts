import { put, takeLatest, call } from "redux-saga/effects";
import { AlertType, STORAGE_KEY } from "../../common";
import { showAlert } from "../../components/HAlert";
import { hideLoading, showLoading } from "../../components/Loading";
import HAxios from "../../services/api/HAxios";
import { login, verifyToken } from "../../services/api/Request";
import { ProcessResponseType } from "../../type/type";
import Storage from "../../utils/Storage";
import { authAction } from "../slices/authSlice";



export default [
    takeLatest(authAction.login.type, loginSaga),
    takeLatest(authAction.logout.type, logoutSaga),
    takeLatest(authAction.verifyToken.type, verifyTokenSaga),
]

function* loginSaga(action: any) {
    try {
        showLoading()
        const params = action.payload

        if (params.type == 'phone') {
            try {
                let data = null
                let error = null

                const response: ProcessResponseType = yield login({ phoneNumber: params.phoneNumber!, password: params.password! })
                data = response.data
                error = response.error

                yield _saveAuthInformation(data)
                // yield put(authActions.getMeRequest())
                yield put(authAction.loginSuccess({ isLogin: true }))
                showAlert(AlertType.SUCCESS, `Đăng nhập thành công, Health Care xin chào`)

            } catch (error: any) {
                if (error.error_description.includes("invalid_username_or_password"))
                    showAlert(AlertType.FAIL, `Mật khẩu chưa đúng, vui lòng nhập lại`)
                else
                    showAlert(AlertType.FAIL, `Đăng nhập thất bại`)
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
        console.log("🚀 ~ file: authSaga.ts ~ line 53 ~ function*loginSaga ~ error", error)
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
            const result = yield call(verifyToken, { refreshToken })
            if (result?.data?.logined) {
                yield put(authAction.verifyTokenSuccess({ isLogin: true }))
            }
        }
        else yield put(authAction.verifyTokenSuccess({ isLogin: false }))

    } catch (error) {
        console.log("🚀 ~ file: authSaga.ts ~ line 94 ~ function*verifyTokenSaga ~ error", error)
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