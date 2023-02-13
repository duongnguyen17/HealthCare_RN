import { ApiResponse, CustomInforType } from "../../type/type";
import HAxios from "./HAxios";
import Urls from "./Urls"

const processResponse = (promise: Promise<ApiResponse>) => {
    return promise.then(response => response?.data).catch(error => { console.log('error processResponse', error) })
}

export const signup = (params: { phoneNumber: string, password: string }) => processResponse(HAxios.post(Urls.SIGNUP, params))

export const login = (params: { phoneNumber: string, password: string }) => processResponse(HAxios.post(Urls.LOGIN, params))

export const verifyToken = (params: { refreshToken: string }) => processResponse(HAxios.post(Urls.VERIFY_TOKEN, params))

export const getProfile = () => processResponse(HAxios.get(Urls.GET_INFOR))

export const updateUserProfile = (customInfor: CustomInforType) => processResponse(HAxios.patch(Urls.CHANGE_INFOR, customInfor))