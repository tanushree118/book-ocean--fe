import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import { logger } from 'redux-logger';
import  appReducer from "./state/reducer";
import rootSaga from './state/saga';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   appReducer,
   applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
