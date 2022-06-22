import {combineReducers} from 'redux';
// import { cartData } from './test/reducer';
import { cartReducers } from './reducers/cartReducers';
// export default combineReducers({
//     cartData,
//     cartReducers
// })

export default combineReducers({
    cart: cartReducers
})
