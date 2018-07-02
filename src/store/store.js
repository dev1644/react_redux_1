import { reducer }   from "../reducers/UserReducer";
import {createStore,applyMiddleware} from 'redux'   
import {watcherSaga} from "../sagas/watcherSagas/AllWatcherSagas"
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store=createStore(reducer,applyMiddleware(sagaMiddleware)); 

sagaMiddleware.run(watcherSaga);

export default store;
