import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { watcherSaga } from "./sagas/watcherSagas/AllWatcherSagas";
// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { Provider } from "react-redux";

// const sagaMiddleware = createSagaMiddleware();

// let store = createStore(
//     reducer,
//     compose(applyMiddleware(sagaMiddleware))
//   );

//   sagaMiddleware.run(watcherSaga);

// ReactDOM.render(
{/* <Provider store={store}><App /></Provider>, document.querySelector('.container')); */}
ReactDOM.render(<App/>, document.querySelector('.container'));


