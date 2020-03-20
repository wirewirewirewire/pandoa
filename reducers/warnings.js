import {
  GENERATE_WARNINGS,
  DELETE_WARNING,
  EDIT_WARNING,
  COMPLETE_WARNING,
  COMPLETE_ALL_WARNINGS,
  CLEAR_ALL,
  CLEAR_COMPLETED
} from "../constants/ActionTypes";

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case GENERATE_WARNINGS:
      return action.data;
    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    case CLEAR_ALL:
      return initialState;

    default:
      return state;
  }
}
