import React from "react";
import "../styles/component/TodoList.css";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ToDoListProps {
  todo: Todo;
  onHandleDeleteTodo: (id: string) => void;
  onHandleEditTodo: (todoId: string) => void;
  onHandleViewTodo: (todoId: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  todo,
  onHandleDeleteTodo,
  onHandleEditTodo,
  onHandleViewTodo,
}) => {
  return (
    <div className="todo-item">
      <div className="todo-item__header">
        <h3 className="todo-item__title">{todo.title}</h3>
        <div className="todo-item__actions">
          <button
            onClick={() => onHandleViewTodo(todo.id)}
            className="btn btn--outline"
            title="View Details"
          >
            View
          </button>
          <button
            onClick={() => onHandleEditTodo(todo.id)}
            className="btn btn--outline"
          >
            Edit
          </button>
          <button
            onClick={() => onHandleDeleteTodo(todo.id)}
            className="btn btn--danger"
          >
            Delete
          </button>
        </div>
      </div>
      {todo.description && (
        <p className="todo-item__description">{todo.description}</p>
      )}
    </div>
  );
};

export default ToDoList;
