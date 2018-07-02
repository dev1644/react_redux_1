import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {UserDetailsSaga} from "../WorkerSagas/UserDetailsSaga"
import { GET_USER_LIST_DETAILS_REQUEST } from "../../components/actions/types";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(GET_USER_LIST_DETAILS_REQUEST, UserDetailsSaga);
}
  
  

