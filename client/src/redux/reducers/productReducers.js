import { PRODUCT_LIST, PRODUCT_SINGLE, SET_PRODUCT_LIST } from './../constants/productConstants';

export const prouctReducer = (payload=[], action) => {

    switch(action.type){
        case SET_PRODUCT_LIST:
            console.log('action from saga product list', action)
            return [...action.payload];
            break;
        case PRODUCT_SINGLE:
            return {...payload};
            break;
        default:
            return payload;
    }
}
