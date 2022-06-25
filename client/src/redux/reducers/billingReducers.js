import { BILLING_DETAIL_FILLS } from "../constants/billingConstants";


let INITIAL_STATE = {
    billing_details:[]
};

export const billingReducers = (state=INITIAL_STATE, action) => {

    switch(action.type){
        case BILLING_DETAIL_FILLS:
            // console.log('billing detail reducer', action)
            return {...action.payload};
            break;
        default:
            return state;
    }
}