import axios from '../helpers/axios';
import { userConstants } from "./constants"


export const signup = (user) => {

    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST })
        const res = await axios.post('/admin/signup', {
            ...user
        })

        if (res.status === 201) {
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: { message }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                })
            }
        }
    }
}

// export const signup = (user) => {
//     console.log(`df ${user}`)

//     return async (dispatch) => {
//         dispatch({ type: userConstants.USER_REGISTER_REQUEST })
//         await axios.post('http://localhost:2000/api/admin/signup', user).then(res => {
//             const { message } = res.data;
//             dispatch({
//                 type: userConstants.USER_REGISTER_SUCCESS,
//                 payload: { message }
//             })
//         }).catch(error => {
//             dispatch({
//                 type: userConstants.USER_REGISTER_FAILURE,
//                 payload: { error: error }
//             })
//         })


//     }
// }

