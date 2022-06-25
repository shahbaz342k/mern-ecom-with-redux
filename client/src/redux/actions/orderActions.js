import { ORDER_SUCCESS } from "../constants/orderConstants"

// user order 
export const userOrderSuccess = (order) => {

    return {
        type:ORDER_SUCCESS,
        payload:order
    }
}