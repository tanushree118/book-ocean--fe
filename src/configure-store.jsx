import { createStore, applyMiddleware } from 'redux';
import appReducer from './state/reducer';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
