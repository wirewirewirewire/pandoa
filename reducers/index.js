import { combineReducers } from "redux";
import positions from "./positions";
import warnings from "./warnings";
import tracks from "./tracks";
import report from "./report";

const rootReducer = combineReducers({
  positions,
  warnings,
  tracks,
  report
});

export default rootReducer;
