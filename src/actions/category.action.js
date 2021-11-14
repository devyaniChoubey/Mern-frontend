import axiosInstance from '../helpers/axios'
import { categoryConstants } from './constants';
import axiosAdminInstance from "../helpers/axiosAdmin";

export const getAllCategory = () => {
    return async dispatch => {

        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST })
        const res = await axiosInstance.get('/category/getcategory');
        console.log(res.data);
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }

}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST })

        const res = await axiosAdminInstance.post('http://localhost:2000/api/category/create', form);
        console.log("Response is:", JSON.stringify(res))
        console.log(res.data);
        if (res.status === 200) {

        } else {

        }
    }
}