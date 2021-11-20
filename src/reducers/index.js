import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import orderReducers from "./order.reducers";
import productReducers from "./product.reducers";
import categoryReducers from "./category.reducers";
import pageReducers from "./page.reducers";


const rootReducer = combineReducers({
    auth : authReducers,
    user: userReducers,
    product : productReducers,
    order : orderReducers,
    category : categoryReducers,
    page: pageReducers
})

export default rootReducer;