import axios from "axios";
import { BASE_URL } from "./Urls";

const HAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Headers': 'sentry-trace'
    }
})

HAxios.interceptors.request.use(
    async (config: any) => {
        console.log('[SEND_REQUEST]', config.url, config.data)
        return config
    },
    (error) => Promise.reject(error)

)

HAxios.interceptors.response.use(
    (response) => {
        console.log('[RECEIVE_RESPONSE]', response.data)
        return response
    },
    (error) => {
        console.log("🚀 ~ file: HAxios.ts ~ line 27 ~ error", error.message)
        return error?.response
    }
);


export default HAxios