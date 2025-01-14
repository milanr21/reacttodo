import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";
import EditToDo from "./EditToDo";

import {
  addTodoSuccess,
  getTodo,
  deleteTodoSuccess,
  updateTodoSuccess,
} from "../features/Todos/store/TodoSlice";

import "../styles/component/TodoList.css";
import { RootState, AppDispatch } from "../store/store";
import ViewTodo from "./ViewToDo";

const ToDos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [viewingTodo, setViewingTodo] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todo
  );

  useEffect(() => {
    // Fetch todos initially
    dispatch(getTodo());
  }, [dispatch]);

  const handleAddTodo = (newTodo: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }) => {
    dispatch(addTodoSuccess(newTodo));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodoSuccess(id));
  };

  const handleEditTodo = (todoId: string) => {
    setEditingTodoId(todoId);
  };

  const handleUpdateTodo = (updatedTodo: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }) => {
    dispatch(updateTodoSuccess(updatedTodo));
    setEditingTodoId(null);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setShowModal(false);
  };

  const handleViewTodo = (todoId: string) => {
    setViewingTodo(todoId);
  };

  const handleCloseView = () => {
    setViewingTodo(null);
  };

  const viewingTodoData = viewingTodo
    ? todos.find((todo) => todo.id === viewingTodo)
    : null;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo App</h1>
      </div>

      <AddToDo onHandleAddTodo={handleAddTodo} />

      {loading && <div className="todo-loading">Loading...</div>}
      {error && <div className="todo-error">Error: {error}</div>}

      {/* ToDo List */}
      <ul className="todo-list">
        {todos.map((todo) =>
          editingTodoId === todo.id ? (
            <li key={todo.id}>
              <EditToDo
                todo={todo}
                onHandleUpdateTodo={handleUpdateTodo}
                onCancelEdit={handleCancelEdit}
              />
            </li>
          ) : (
            <li key={todo.id}>
              <ToDoList
                todo={todo}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleEditTodo={handleEditTodo}
                onHandleViewTodo={handleViewTodo}
              />
            </li>
          )
        )}
      </ul>

      {viewingTodoData && (
        <ViewTodo
          todo={viewingTodoData}
          isOpen={!!viewingTodo}
          onClose={handleCloseView}
        />
      )}
    </div>
  );
};

export default ToDos;
