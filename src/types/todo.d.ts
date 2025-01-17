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

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdDate?: string;
  startDate?: string;
  endDate?: string;
}

export interface TodoState {
  loading: boolean;
  success: boolean;
  error: string | null;
  todos: Todo[];
}

export interface ViewTodoProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
}

export interface ToDoListProps {
  todo: Todo;
  onHandleDeleteTodo: (id: string) => void;
  onHandleEditTodo: (todoId: string) => void;
  onHandleViewTodo: (todoId: string) => void;
  onHandleToggleComplete: (todoId: string) => void;
}

export interface EditToDoProps {
  showEditModal: boolean;
  todo: Todo;
  onHandleUpdateTodo: (updatedTodo: Todo) => void;
  onCancelEdit: () => void;
}
