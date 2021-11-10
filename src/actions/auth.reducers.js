import { authConstants } from "./constants"

const initialState = {
    token: null,
    user:{
        firstName: '',
        lastName: '',
        email :'',
        picture: ''
    },
    authenticate: false,
    authenticating : false
}

export default (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                ...action.payload
            }
            break;
    }
}