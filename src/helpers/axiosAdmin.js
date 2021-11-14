import axios from "axios";
import { api } from '../urlConfig';

const token = window.localStorage.getItem('token')

const axiosAdminInstance = axios.create({

    baseURL : api,
    headers : {
        'content-type': 'multipart/form-data',
        'Authorization': token ?`Bearer ${token}` : ''
    }
})

export default axiosAdminInstance;