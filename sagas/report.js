import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import getEnvVars from "../environment";
import {
  API_CALL_REPORT_REQUEST,
  API_CALL_REPORT_SUCCESS,
  API_CALL_REPORT_FAILURE
} from "../constants/ActionTypes";
const { apiUrl, axiosConfig } = getEnvVars();

function* watcherSaga() {
  console.log("watch");
  yield takeEvery(API_CALL_REPORT_REQUEST, workerSaga);
}

function fetchSaga(schoolId) {
  console.log("watch");
  const url = `${apiUrl}/schools/${schoolId.data}/sync`;
  return axios({
    method: "GET",
    url: url,
    ...axiosConfig
  });
}

function* workerSaga(schoolId) {
  try {
    console.log("waaaaa");
    const response = yield call(fetchSaga, schoolId);
    const data = response.data.data.map(e => {
      e.sync = true;
      const { data, ...other } = e;
      const newObject = { ...other, ...data, sync: true };
      return newObject;
    });
    //const data = "hello";
    const results = data;

    yield put({ type: API_CALL_REPORT_SUCCESS, results });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: API_CALL_REPORT_FAILURE, error });
  }
}

export default watcherSaga;
