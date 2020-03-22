import { combineReducers } from "redux";

import detail from "./detail";
import positions from "./positions";
import warnings from "./warnings";
import tracks from "./tracks";
import report from "./report";
import infections from "./infections";
import caseRed from "./case";

const rootReducer = combineReducers({
  caseRed,
  detail,
  infections,
  positions,
  warnings,
  tracks,
  report
});

export default rootReducer;
