import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import getEnvVars from "../environment";
import {
  API_CALL_CASE_REQUEST,
  API_CALL_CASE_SUCCESS,
  API_CALL_CASE_FAILURE
} from "../constants/ActionTypes";
const { apiUrl, axiosConfig } = getEnvVars();

function* watcherSaga() {
  yield takeEvery(API_CALL_CASE_REQUEST, workerSaga);
}

function fetchSaga(data) {
  const url = `${apiUrl}case`;

  return axios({
    method: "GET",
    url: url,
    params: {
      lat: data.data.lat,
      lng: data.data.lng,
      time: data.data.time
    },
    ...axiosConfig
  });
}

function* workerSaga(schoolId) {
  try {
    const response = yield call(fetchSaga, schoolId);
    const data = response.data;
    yield put({ type: API_CALL_CASE_SUCCESS, data });
  } catch (error) {
    yield put({ type: API_CALL_CASE_FAILURE, error });
  }
}

export default watcherSaga;
