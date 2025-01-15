import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "../../../utils/localStorage";
import { toast } from "react-toastify";

export interface Todo {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
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
      toast.success("Todo Added Successfully");
      saveToLocalStorage("todos", state.todos);
    },
    addTodoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload || "Error While adding new ToDo";
    },
    deleteTodo(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    deleteTodoSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = true;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      toast.success("Todo Deleted Successfully");
    },
    deleteTodoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    updateTodo(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    updateTodoSuccess(state, action: PayloadAction<Todo>) {
      state.loading = false;
      state.success = true;
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      toast.success("Todo Updated Successfully");
    },
    updateTodoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    getTodo(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    getTodoSuccess(state, action: PayloadAction<Todo[]>) {
      state.loading = false;
      state.success = true;
      state.todos = action.payload;
    },
    getTodoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  addTodo,
  addTodoSuccess,
  addTodoFailure,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateTodo,
  updateTodoSuccess,
  updateTodoFailure,
  getTodo,
  getTodoSuccess,
  getTodoFailure,
  resetState,
} = TodoSlice.actions;

export default TodoSlice.reducer;
