import {combineReducers} from 'redux';
// import { cartData } from './test/reducer';
import { cartReducers } from './reducers/cartReducers';
import { userReducers } from './reducers/userReducers';
import { billingReducers } from './reducers/billingReducers';
import { orderReducer } from './reducers/orderReducer';
// export default combineReducers({
//     cartData,
//     cartReducers
// })

export default combineReducers({
    cart: cartReducers,
    user: userReducers,
    billing_details:billingReducers,
    order:orderReducer
})
