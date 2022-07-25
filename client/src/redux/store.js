// import { createStore } from "redux";
import rootReducer from "./rootReducer";
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// const store = createStore(rootReducer)
import productSaga from "./saga/productSaga";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore(
    {reducer:rootReducer, middleware: () => [sagaMiddleware]}
);

sagaMiddleware.run(productSaga);
export default store;
