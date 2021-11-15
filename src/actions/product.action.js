import axios from "axios"
import axiosAdminInstance from "../helpers/axiosAdmin"

export const addProduct = form =>{
    return async dispatch=> {
        const res = await axiosAdminInstance.post('/product/create', form);
        console.log(res.data);
    }
}