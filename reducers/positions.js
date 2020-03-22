import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  CLEAR_ALL,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  ADD_LOCATION
} from "../constants/ActionTypes";

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          ...action.data
        }
      ];
    /*
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));
*/
    case CLEAR_ALL:
      return initialState;

    default:
      return state;
  }
}
