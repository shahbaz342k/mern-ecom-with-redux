//  react js se data ko reducer me send krte hai
// Action is used to send the data from action to reducer 
// Thumb Rules : Must have type key in return statement
// https://github.com/jalvaradoas39/restaurant-tutorial/blob/master/client/src/redux/actions/cartActions.js
import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from './../constants/cartConstants';


export const addToCart = (product) => {
    // if cart already exists in local storage, use it, otherwise set to empty array
	let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    /* 
    // check if duplicates
	const duplicates = cart.filter(cartItem => cartItem._id === product._id);

    // if no duplicates, proceed
	if (duplicates.length === 0) {
		// prep product data
		const productToAdd = {
			...product,
			count: 1,
		};

		// add product data to cart
		cart.push(productToAdd);

		// add cart to local storage
		localStorage.setItem('cart', JSON.stringify(cart));
    */
		


        let _cart = {...cart};
        // check cart.items in cart object
       if( ! _cart.items ){
           _cart.items = {}
       }
       
       // check product _id already exist in cart items object
       if( _cart.items[product._id]) {
           // console.log('add plus 1 more',product._id)
           _cart.items[product._id] += 1
       }else{
           _cart.items[product._id] = 1;
           // console.log('add plus 1',_cart.items[product._id])
       }

       // check totl iems in cart object
       if( !_cart.totalItems ){
           _cart.totalItems = 0;
       }

       // increase totalitems by one 
       _cart.totalItems +=1;
       cart = _cart;

    //    console.log(_cart)   
       // add cart to local storage
		localStorage.setItem('cart', JSON.stringify(cart));

        return {
            type:ADD_TO_CART,
            payload:cart
        }
}
export const updateCartQuantity = (product, quantity, updType) => {
     // if cart already exists in local storage, use it, otherwise set to empty array
	let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // check if foundProduct
    let ids = Object.keys(cart.items);
	const foundProduct = ids.filter(id => id === product._id);
    let itemKey = foundProduct[0];
    

        // let productToAdd;
        let _cart = {...cart};
        if( updType == 'inc' ){
            if( _cart.items[itemKey]) {
                // console.log('add plus 1 more',itemKey)
                _cart.items[itemKey] += 1
            }
            // increase totalitems by one 
            _cart.totalItems +=1;
        }else{
            if( _cart.items[itemKey]) {
                // console.log('add plus 1 more',itemKey)
                _cart.items[itemKey] -= 1
            }
            // increase totalitems by one 
            _cart.totalItems -=1;
        }
        
        cart = _cart;
         // add cart to local storage
         localStorage.setItem('cart', JSON.stringify(cart));
 
        

        // if( updType == 'inc' ){
        //     productToAdd = {
        //         ...product,
        //         count: quantity + 1,
        //     };
        // }else{
        //     productToAdd = {
        //         ...product,
        //         count: quantity - 1,
        //     };
        // }
        // cart.some(item=>item._id === productToAdd._id)
        // console.log('before doing ', cart)
        //  console.log('product to add ', productToAdd)

         // add product data to cart
        //  cart.filter((cartItem) => {

        //     if(cartItem._id === product._id){
        //         cartItem.count = productToAdd.count;
        //     } 
        // });
        
         // add cart to local storage
        //  localStorage.setItem('cart', JSON.stringify(cart));
         
        
    
    return {
        type: UPDATE_CART_QUANTITY,
        payload: cart
    }
}

export const removeFromCart = (product) => {

    // if cart already exists in local storage, use it, otherwise set to empty array
	let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // check if foundProduct
	// cart.filter( (cartItem) => {
    //     if( cartItem._id === product._id ){
    //         cart.pop(product);
    //     }
        
    // });
    // console.log('found product in remove item',foundProduct)

    let ids = Object.keys(cart.items);
	const foundProduct = ids.filter(id => id === product._id);
    let itemKey = foundProduct[0];
    
    // get old qty for that product for subtact from totlaitems
    let oldQty = cart.items[itemKey];
    console.log('old qty: ', oldQty)

    let _cart = {...cart};

    if( _cart.items[itemKey] ) {
        // const _cart = {...cart};
        delete cart.items[itemKey];
        _cart.totalItems = _cart.totalItems - oldQty;
        cart = _cart;
        // add cart to local storage
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    return {
        type: REMOVE_FROM_CART,
        payload: cart
    }
};

export const clearCart = () =>{

    // if cart already exists in local storage, use it, otherwise set to empty array
	let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart = {
        items:{},
        totalItems:0,
    }
    window.localStorage.setItem('cart', JSON.stringify(cart));
    // window.localStorage.removeItem('cart');

    return {
        type: CLEAR_CART,
        payload: cart
    }
}