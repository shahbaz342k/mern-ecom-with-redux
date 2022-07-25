import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { PRODUCT_LIST, SET_PRODUCT_LIST } from './../constants/productConstants';

// generator functions which is used for perform async operations; like api calling

function* getProducts(){
    const url = 'http://localhost:5000/api/products';
    const {data} = yield axios(url);
    // console.log(products);
    yield put({
        type: SET_PRODUCT_LIST,
        payload:data.result
    })
}
function* productSaga() {
    yield takeEvery(PRODUCT_LIST, getProducts)
}
export default productSaga;