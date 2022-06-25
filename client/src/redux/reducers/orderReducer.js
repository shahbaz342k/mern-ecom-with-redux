
import { ORDER_SUCCESS } from './../constants/orderConstants';
let INITIAL_STATE = {
    order:[]
};
export const orderReducer = (state=INITIAL_STATE, action) => {

    // switch case
    switch (action.type) {
        case ORDER_SUCCESS:
            return {...action.payload}
            break;
        default:
            return state;
            break;
    }
}