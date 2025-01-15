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
  getTodoSuccess,
} from "../features/Todos/store/TodoSlice";

import "../styles/component/TodoList.css";
import { RootState, AppDispatch } from "../store/store";
import ViewTodo from "./ViewToDo";
import { loadFromLocalStorage } from "../utils/localStorage";

const ToDos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingTodo, setViewingTodo] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todo
  );

  useEffect(() => {
    const loadLocalStorage = JSON.parse(loadFromLocalStorage("todos"));
    console.log("The local storage loading", loadLocalStorage);

    if (loadLocalStorage && Array.isArray(loadLocalStorage)) {
      dispatch(getTodoSuccess(loadLocalStorage));
    } else {
      dispatch(getTodo());
    }
  }, [dispatch]);

  const handleAddModal = () => {
    setShowAddModal(true);
  };

  const handleAddTodo = (newTodo: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;

    completed: boolean;
  }) => {
    dispatch(addTodoSuccess(newTodo));
    setShowAddModal(false);
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
    startDate: string;
    endDate: string;
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

      <button onClick={handleAddModal} className="btn btn--primary">
        Add New Todo
      </button>

      <AddToDo
        isOpen={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onHandleAddTodo={handleAddTodo}
      />

      {loading && <div className="todo-loading">Loading...</div>}
      {error && <div className="todo-error">Error: {error}</div>}

      {/* ToDo List */}
      <ul className="todo-list">
        {todos?.map((todo) =>
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
