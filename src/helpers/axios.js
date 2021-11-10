import axios from "axios";
import {api} from '../urlConfig'

const axiosInstance = axios.instance({
    baseURL : api
    // headers : {
    //     "Authorization": ""
    // }
}) 

export default axiosInstance;