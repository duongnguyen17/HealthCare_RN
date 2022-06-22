import { ApiResponse } from "../../type/type";
import HAxios from "./HAxios";
import Urls from "./Urls"

const processResponse = (promise: Promise<ApiResponse>) => {
    return promise.then(response => ({ error: null, data: response.data?.data ?? response.data })).catch(error => ({ error, data: error?.response?.data?.data ?? error?.response?.data ?? error?.response ?? error }))
}

export const login = (params: { phoneNumber: string, password: string }) => processResponse(HAxios.post(Urls.LOGIN, params))

export const verifyToken = (params: { refreshToken: string }) => processResponse(HAxios.post(Urls.VERIFY_TOKEN, params))

export const getProfile = () => processResponse(HAxios.get(Urls.GET_INFOR))