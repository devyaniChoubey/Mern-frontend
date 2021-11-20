import axiosAdminInstance from "../helpers/axiosAdmin"
import { pageConstants } from "./constants";
//import { pageConstants } from "./constants";
export const createPage = (form) => {
    return async dispatch => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
        try {
            const res = await axiosAdminInstance.post('/page/create', form);
            if (res.status === 201) {
                dispatch({
                    type: pageConstants.CREATE_PAGE_SUCCESS,
                    payload: { page: res.data.page }
                })
            } else {
                dispatch({
                    type: pageConstants.CREATE_PAGE_FAILURE,
                    payload: { error: res.data.error }
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
}