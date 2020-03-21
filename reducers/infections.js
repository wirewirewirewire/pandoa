import {
  API_CALL_INFECTIONS_REQUEST,
  API_CALL_INFECTIONS_SUCCESS,
  API_CALL_INFECTIONS_FAILURE
} from "../constants/ActionTypes";

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case API_CALL_INFECTIONS_REQUEST:
      return state; //{ ...state, fetching: true, error: null };
    case API_CALL_INFECTIONS_SUCCESS:
      return [...action.data];
    case API_CALL_INFECTIONS_FAILURE:
      return [];
    default:
      return state;
  }
}
