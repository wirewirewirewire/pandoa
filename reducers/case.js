import {
  API_CALL_CASE_REQUEST,
  API_CALL_CASE_SUCCESS,
  API_CALL_CASE_FAILURE
} from "../constants/ActionTypes";

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case API_CALL_CASE_REQUEST:
      return state; //{ ...state, fetching: true, error: null };
    case API_CALL_CASE_SUCCESS:
      return action.data;
    case API_CALL_CASE_FAILURE:
      return [];
    default:
      return state;
  }
}
