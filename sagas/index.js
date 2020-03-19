import { all, fork } from "redux-saga/effects";
import watcherReportSaga from "./report";
import watcherInfectionsSaga from "./infections";

export default function* rootSaga() {
  yield all([fork(watcherInfectionsSaga), fork(watcherReportSaga)]);
}
