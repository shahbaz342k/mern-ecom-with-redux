import { LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "../constants/userConstants"
import { LOGIN_FAILURE } from './../constants/userConstants';

export const loginStart = () => {
    // console.log('login start')
    window.localStorage.removeItem('user')
    return {
        type:LOGIN_START,
        payload: ''
    }
}

// login success
export const loginSuccess = (userData) => {

    // firstly store the user in localstorage 
    window.localStorage.setItem('user', JSON.stringify(userData));

    const user = {
        user : JSON.parse(window.localStorage.getItem('user')),
        loading : false,
        error: false,
    };

    return {
        type:LOGIN_SUCCESS,
        payload: user,
    }
}

// login failure 
export const loginFailure = (error) => {
    window.localStorage.removeItem('user')
    const user = {
        user:'',
        loading:false,
        error: error
    };

    return {
        type:LOGIN_FAILURE,
        payload: user,
    }
}

// login failure 
export const logout = (userData) => {
    const user = window.localStorage.removeItem('user');
    // const user = {
    //     user:window.localStorage.removeItem('user'),
    //     loading:false,
    //     error: false
    // };
    return {
        type:LOGOUT,
        payload: user,
    }
}

// user registration success
// login success
export const registrationSuccess = (userData) => {

    // firstly store the user in localstorage 
    window.localStorage.setItem('user', JSON.stringify(userData));

    const user = {
        user : JSON.parse(window.localStorage.getItem('user')),
        loading : false,
        error: false,
    };

    return {
        type:LOGIN_SUCCESS,
        payload: user,
    }
}