import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import getEnvVars from "../environment";
import {
  API_CALL_INFECTIONS_REQUEST,
  API_CALL_INFECTIONS_SUCCESS,
  API_CALL_INFECTIONS_FAILURE
} from "../constants/ActionTypes";
const { apiUrl, axiosConfig } = getEnvVars();

function* watcherSaga() {
  console.log("watchaaaaa");
  yield takeEvery(API_CALL_INFECTIONS_REQUEST, workerSaga);
}

function fetchSaga(schoolId) {
  console.log("watchaaaaa");
  const url = `${apiUrl}download`;

  console.log(url);
  return axios({
    method: "GET",
    url: url,
    ...axiosConfig
  });
}

function* workerSaga(schoolId) {
  try {
    const response = yield call(fetchSaga, schoolId);
    console.log("response", response.data.data);
    const data = response.data.data;

    yield put({ type: API_CALL_INFECTIONS_SUCCESS, data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: API_CALL_INFECTIONS_FAILURE, error });
  }
}

export default watcherSaga;
