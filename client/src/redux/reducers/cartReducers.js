// it handle the store's data
// whenever we intract from react it take the data from action 
// reducer not directly contact with react 
// Thumb Rules : 
// 1. Need Root Reducer
// 2. Reducer must return the some value
// 3. The reducer must have some inital value

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from './../constants/cartConstants';

let INITIAL_STATE = {
    cart:[]
};
if(window.localStorage.getItem('cart')){
    INITIAL_STATE.cart = JSON.parse( window.localStorage.getItem('cart') );
}else{
    INITIAL_STATE.cart = [];
}

export const cartReducers = (state=INITIAL_STATE, action) => {
    
   
    switch (action.type) {
        case ADD_TO_CART:
            // console.log('action: ',action)
            return {
                cart:[action.payload]
            }
            break;
        case UPDATE_CART_QUANTITY:
            // console.log('update to cart in', action)
            return {
                cart:[action.payload]
            }
            break;
        case REMOVE_FROM_CART:
            // console.log('remove to cart in', action.data)
            return {
                cart:[action.payload]
            }
            break;
        default:
            return state;
    }
}