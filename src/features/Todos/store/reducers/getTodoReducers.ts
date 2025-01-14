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
    case actions.GET_TODO_LIST:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        todos: action.payload,
      };
    case actions.GET_TODO_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Failed to get the todo List",
      };
    case actions.GET_TODO_LIST_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
