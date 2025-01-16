import React from "react";
import { Edit, Trash, Eye } from "lucide-react";
import "../styles/component/TodoList.css";
import { SortableList } from "../Sortable/SortableList";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdDate: string;
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
      </div>
      <p className="todo-item__description">{todo.description}</p>
      <div className="todo-item__date">
        {todo.completed ? "Completed" : "Updated on"}:{" "}
        {new Date().toLocaleDateString()}
      </div>
      <div className="todo-item__actions">
        <SortableList.DragHandle />

        <div className="todo-item__actions-right">
          <button
            onClick={() => onHandleViewTodo(todo.id)}
            className="icon-btn"
            title="View Todo"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={() => onHandleEditTodo(todo.id)}
            className="icon-btn"
            title="Edit Todo"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onHandleDeleteTodo(todo.id)}
            className="icon-btn icon-btn--danger"
            title="Delete Todo"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
