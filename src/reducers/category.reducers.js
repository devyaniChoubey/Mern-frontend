import { categoryConstants } from "../actions/constants"


const initState = {
    categories: [],
    loading : false,
    error: null
}

export default (state = initState, action) =>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading : false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading : true
            }
            break;
    }
    return state;
}