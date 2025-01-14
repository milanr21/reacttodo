import actions from "../actions";
import { TodoState, Action } from "../../../../types/todo";
import { saveToLocalStorage } from "../../../../utils/localStorage";

const initialState: TodoState = {
  loading: false,
  success: false,
  error: null,
  todos: [],
};

const reducer = (state = initialState, action: Action): TodoState => {
  switch (action.type) {
    case actions.ADD_TODO_ITEM:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actions.ADD_TODO_ITEM_SUCCESS:
      const updatedTodos = [...state.todos, action.payload];
      saveToLocalStorage("todos", updatedTodos);
      return {
        ...state,
        loading: false,
        success: true,
        todos: updatedTodos,
      };
    case actions.ADD_TODO_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: "Failed to add todo item",
      };
    case actions.ADD_TODO_ITEM_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
