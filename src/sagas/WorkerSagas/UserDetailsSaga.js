import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { GET_USER_LIST_DETAILS_SUCCESS, GET_USER_LIST_DETAILS_FAILURE } from "../../components/actions/types";

// function that makes the api request and returns a Promise for response
export function getData(data,url) {

  return axios({
    method: "get",
    url: url,
     
  });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* UserDetailsSaga(action) {
  console.log("EditBAnkinsaga123",action.data)
  try {
    const response = yield call(getData,action.data,`https://apimychoice.sia.co.in/admin/userlist`);
    const data = response.data;
    // dispatch a success action to the store with the new data
    yield put({ type: GET_USER_LIST_DETAILS_SUCCESS, data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: GET_USER_LIST_DETAILS_FAILURE, error })
    alert(error);
    
  }
}
