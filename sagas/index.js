import { all, fork } from "redux-saga/effects";
import watcherReportSaga from "./report";

export default function* rootSaga() {
  yield all([fork(watcherReportSaga)]);
}
