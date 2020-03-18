import {
  API_CALL_REPORT_REQUEST,
  API_CALL_REPORT_SUCCESS
} from "../constants/ActionTypes";

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REPORT_REQUEST:
      console.log("request started");
      return { ...state, fetching: true, error: null };
    case API_CALL_REPORT_SUCCESS:
      return [...state];
    default:
      return state;
  }
}

/*

  {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          data: action.data
        }
case "API_CALL_GETSCHOOL_REQUEST":
  return { ...state, fetching: true, error: null };
case "API_CALL_GETSCHOOL_SUCCESS":
  state.currentSchool = action.currentSchool;
  return { ...state, fetching: false };
case "API_CALL_GETSCHOOL_FAILURE":
  return {
    ...state,
    fetching: false,
    error: action.error,
    errorResponse: action.error.response
  };
*/
