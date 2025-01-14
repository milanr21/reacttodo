import { configureStore } from "@reduxjs/toolkit";
import {
  addTodoReducer,
  deleteTodoReducer,
  getTodoReducer,
  updateTodoReducer,
} from "../features/Todos/store";

const store = configureStore({
  reducer: {
    getTodos: getTodoReducer,
    addTodos: addTodoReducer,
    updateTodos: updateTodoReducer,
    deleteTodos: deleteTodoReducer,
  },
});

export default store;
