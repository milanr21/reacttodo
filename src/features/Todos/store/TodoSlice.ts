import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "../../../utils/localStorage";


export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoState {
  loading: boolean;
  success: boolean;
  error: string | null;
  todos: Todo[];
}

const initialState: TodoState = {
  loading: false,
  success: false,
  error: null,
  todos: [],
};


const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        addTodoSuccess(state, action: PayloadAction<Todo>) {
            state.loading = false;
            state.success = true;
            state.todos.push(action.payload);
            saveToLocalStorage("todos", state.todos)
        },
        addTodoFailure(state, action: PayloadAction<string>) {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Error While adding new ToDo"
        },
        deleteTodo(state) {
          state.loading = true;
          state.success = false;
          state.error = null;
        },
        deleteTodoSuccess(state, action: PayloadAction<string>) {
          state.loading = false;
          state.success = true;
          state.todos.filter((todo) => todo.id !== action.payload);
        },
        deleteTodoFailure(state, action: PayloadAction<string>) {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        },
        
    }
})