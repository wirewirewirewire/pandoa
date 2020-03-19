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

function fetchSaga(data) {
  console.log("watch");
  const url = `${apiUrl}upload`;

  /* const data = {
    data: [
      { lat: "50", lng: "350", time: "454:444" },
      { lat: "20", lng: "30", time: "44:44" },
      { lat: "40", lng: "340", time: "464:44" },
      { lat: "50", lng: "350", time: "454:444" },
      { lat: "20", lng: "30", time: "44:44" },
      { lat: "40", lng: "340", time: "464:44" },
      { lat: "50", lng: "350", time: "454:444" },
      { lat: "60", lng: "36", time: "44:464" }
    ]
  };*/

  console.log(url, data);
  return axios({
    method: "POST",
    url: url,
    data: data,
    ...axiosConfig
  });
}

function* workerSaga(schoolId) {
  try {
    console.log("waaaaa");
    const response = yield call(fetchSaga, schoolId);
    /*const data = response.data.data.map(e => {
      e.sync = true;
      const { data, ...other } = e;
      const newObject = { ...other, ...data, sync: true };
      return newObject;
    });*/
    //const data = "hello";
    const results = "aaaa";
    console.log();

    yield put({ type: API_CALL_REPORT_SUCCESS, results });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: API_CALL_REPORT_FAILURE, error });
  }
}

export default watcherSaga;
