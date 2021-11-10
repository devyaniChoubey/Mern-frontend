import { authConstants } from "./constants";
import axios from '../helpers/axios';

export const login = (user) => {


    return async (dispatch) => {
        dispatch({type: authConstants.LOGIN_REQUEST})
        const res = await axios.post('/admin/signin',{
            ...user
        })

        dispatch({type: authConstants.LOGIN_REQUEST,payload: {
            ...user
        }})
    }
}