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
  yield takeEvery(API_CALL_REPORT_REQUEST, workerSaga);
}

function fetchSaga(data) {
  const url = `${apiUrl}upload`;

  return axios({
    method: "POST",
    url: url,
    data: data,
    ...axiosConfig
  });
}

function* workerSaga(schoolId) {
  try {
    const response = yield call(fetchSaga, schoolId);

    const results = "aaaa";

    yield put({ type: API_CALL_REPORT_SUCCESS, results });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: API_CALL_REPORT_FAILURE, error });
  }
}

export default watcherSaga;
