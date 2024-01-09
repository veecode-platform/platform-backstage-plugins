import axios from 'axios';
import { AlertApi, ConfigApi, IdentityApi } from '@backstage/core-plugin-api';

type axiosInstanceProps = {
    config: ConfigApi;
    alert: AlertApi;
    identity: IdentityApi;
}

export const createAxiosInstance = ({config, alert, identity}: axiosInstanceProps) => {

    const axiosInstance = axios.create({
        baseURL: `${config.getString("backend.baseUrl")}/api/devportal`,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    axiosInstance.interceptors.request.use( async (request)=>{
        const credentials = await identity.getCredentials()
        request.headers.Authorization = `Bearer ${credentials.token}`
        return request
    })

    axiosInstance.interceptors.response.use(
        (response) => {
            if(response.config.method === "get") return response;
            alert.post({
                message: response.data.message,
                severity: "success",
                display: "transient"
            })
            return response 
        }, 
        (error) => {
            alert.post({
                message: error.response.data.message || error.response.data.error.message,
                severity: "error",
            })
            return false

        })
    
    return axiosInstance
}

const AxiosInstance = axios.create({
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
});

export default AxiosInstance;