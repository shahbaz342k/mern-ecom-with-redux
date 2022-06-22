//  react js se data ko reducer me send krte hai
// Action is used to send the data from action to reducer 
// Thumb Rules : Must have type key in return statement

import { ADD_TO_CART, REMOVE_TO_CART } from "./constant";

export const addToCart = (data) => {
    // console.log('add to cart',data);
    return {
        type:ADD_TO_CART,
        payload:data
    }
}

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_TO_CART,
        payload: {
            productId: productId
        }
    }
};
export const updateCartQuantity = (productId, quantity) => {
  return {
      type: 'UPDATE_CART_QUANTITY',
      payload: {
          productId,
          quantity: quantity
      }
  }
}