// it handle the store's data
// whenever we intract from react it take the data from action 
// reducer not directly contact with react 
// Thumb Rules : 
// 1. Need Root Reducer
// 2. Reducer must return the some value
// 3. The reducer must have some inital value

import { ADD_TO_CART, REMOVE_TO_CART } from "./constant"

let getCart = () => {
    let temp;
    // setInterval( () => {
    //     temp = JSON.parse(window.localStorage.getItem('cart'))
    // },1000)
    temp = JSON.parse(window.localStorage.getItem('cart'))
    return temp
}

const initialState = {
    cart:[]
}
    // window.localStorage.setItem('cart', JSON.stringify(initialState.cart))
// let cart ={
//     items: {},
//     totalItems: 0
// }
export const cartData = (state=initialState, action) => {
    
    /* if( action.type === ADD_TO_CART ){
        console.log('ADD_TO_CART reducer call',action.data)
        return action.data;
    }else{
        return 'not action called'
    } */
   
    switch (action.type) {
        case ADD_TO_CART:
            // console.log('add to cart in', action.data)
            /*
            cart ={
                items: {1:3,2:1,3:5}
                totalItems: 5
            }
            */
            // window.localStorage.setItem('cart')

            let _cart = {...state.cart};
             // check cart.items in cart object
            if( ! _cart.items ){
                _cart.items = {}
            }
            
            // check product _id already exist in cart items object
            if( _cart.items[action.payload._id]) {
                // console.log('add plus 1 more',action.payload._id)
                _cart.items[action.payload._id] += 1
            }else{
                _cart.items[action.payload._id] = 1;
                // console.log('add plus 1',_cart.items[action.payload._id])
            }

            // check totl iems in cart object
            if( !_cart.totalItems ){
                _cart.totalItems = 0;
            }

            // increase totalitems by one 
            _cart.totalItems +=1;

            console.log(_cart)
            
            initialState.cart = _cart; 

            // if( !getCart().items[action.payload._id] ){
            //     // console.log('already ', getCart().items[action.payload._id])
            //     window.localStorage.setItem('cart', JSON.stringify(payload.cart))
            // }

            // if( getCart() ){
            //     console.log('persist', getCart())
            // }else{
            //     console.log('not persist', getCart())
            // }

            // initialState.cart.push(action.payload);
            return {
                ...state,
                cart: initialState.cart
            };
            
            // window.localStorage.setItem('cart', JSON.stringify(data.cart))
            
            // return [action.data, ...data];
            // return [action.data];
            break;
        case REMOVE_TO_CART:
            // console.log('remove to cart in', action.data)
            return 1-1;
            break;
        default:
            return state;
    }
    // we can use switch statement here
    // return 100
}