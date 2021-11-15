import { productconstants } from "../actions/constants";
const intialState = {
    products :[]
}

export default (state = intialState,action) => {
    switch(action.type){
        case productconstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products : action.payload.products
            }
            break;
    }
    return state;
}