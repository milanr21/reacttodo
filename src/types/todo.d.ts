export interface TodoState {
  loading: boolean;
  success: boolean;
  error: string | null;
  todos: Array<any>;
}

export interface Action {
  type: string;
  payload?: any;
}
