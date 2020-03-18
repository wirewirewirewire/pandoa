import {
  ADD_WARNING,
  DELETE_WARNING,
  EDIT_WARNING,
  COMPLETE_WARNING,
  COMPLETE_ALL_WARNINGS,
  CLEAR_ALL,
  CLEAR_COMPLETED
} from "../constants/ActionTypes";

const initialState = [
  {
    title: "Große Nikolaistraße 2",
    description:
      "Close contact with a person infected with COVID-19 for about 25 minutes"
  },
  {
    title: "Kleinschmieden 2A",
    description:
      "Close contact with a person infected with COVID-19 for about 10 minutes"
  },
  {
    title: "Eislebener Straße 42E",
    description:
      "Close contact with a person infected with COVID-19 for about 50 minutes"
  }
];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_WARNING:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          data: action.data
        }
      ];

    case DELETE_WARNING:
      return state.filter(todo => todo.id !== action.id);

    case EDIT_WARNING:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case COMPLETE_WARNING:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_ALL_WARNINGS:
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }));

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    case CLEAR_ALL:
      return initialState;

    default:
      return state;
  }
}
