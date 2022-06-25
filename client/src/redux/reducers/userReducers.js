
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './../constants/userConstants';
const INITIAL_STATE = {
    user: JSON.parse( window.localStorage.getItem("user") ) || null,
    loading:null,
    error:null
}
export const userReducers = (state=INITIAL_STATE, action) => {

    switch(action.type){
        case LOGIN_START:
            return {
                user:null,
                loading:true,
                error:null
            }
            break;
        case LOGIN_SUCCESS:
            // console.log('login success: ',action);
            return {...action.payload}
            break;
        case LOGIN_FAILURE:
            return {...action.payload}
            break;
        case LOGOUT:
            return {...action.payload}
            break;
        default:
            return state;
    }

}