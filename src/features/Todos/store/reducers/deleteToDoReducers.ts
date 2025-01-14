import actions from "../actions";
import { TodoState, Action } from "../../../../types/todo";

const initialState: TodoState = {
  loading: false,
  success: false,
  error: null,
  todos: [],
};

const reducer = (state = initialState, action: Action): TodoState => {
  switch (action.type) {
    case actions.DELETE_TODO_ITEM:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actions.DELETE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        error: null,
      };
    case actions.DELETE_TODO_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: "Failed to delete todo item",
      };
    case actions.DELETE_TODO_ITEM_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
