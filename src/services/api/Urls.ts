
export const BASE_URL = "http://192.168.1.8:3000/health_care"
const ROUTE = {
    AUTH: "/auth",
    USER: "/user"
}
const URLS = {
    LOGIN: `${ROUTE.AUTH}/login`,
    SIGNUP: `${ROUTE.AUTH}/signup`,
    THIRD_PARTY_LOGIN: `${ROUTE.AUTH}/third_party_login`,
    FORGOT_PASSWORD: `${ROUTE.AUTH}/forgot_password`,
    REFRESH_TOKEN: `${ROUTE.AUTH}/refresh_token`,
    GET_INFOR: `${ROUTE.USER}`,
    CHANGE_INFOR: `${ROUTE.USER}/changeInfor`,
    VERIFY_TOKEN: `${ROUTE.USER}/verify_token`,
    UPDATE_PROFILE: `${ROUTE.USER}/changeInfor`,
}

export default URLS