import axiosInstance from '../helpers/axios'
import { categoryConstants } from './constants';
import axios from "axios";
import axiosAdminInstance from '../helpers/axiosAdmin';

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
        try {
            const res = await axiosAdminInstance.post('/category/create', form);
            console.log(res.data);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data.category }
                })
            } else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                })
            }
        } catch (error) {
            console.log(error.response);
        }

    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST })
        const res = await axiosInstance.post('/category/update', form);
        if (res.status === 201) {
            dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS })
            dispatch(getAllCategory())
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: { error }
            })
        }
    }
}

export const deleteCategoriesAction = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST })
        const res = await axiosInstance.post('/category/delete', {
            payload: {
                ids
            }
        })

        if (res.status == 201) {
            dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS })
            dispatch(getAllCategory())
        } else {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}