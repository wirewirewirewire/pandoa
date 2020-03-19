import * as types from "../constants/ActionTypes";

export const addTodo = data => ({ type: types.ADD_TODO, data });
export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearAll = () => ({ type: types.CLEAR_ALL });
export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
});
/*
export const reportCase = data => ({
  type: types.DELETE_TODO,
  data
});*/

export const downloadInfections = () => ({
  type: types.API_CALL_INFECTIONS_REQUEST
});

export const reportCase = data => ({
  type: types.API_CALL_REPORT_REQUEST,
  data
});
