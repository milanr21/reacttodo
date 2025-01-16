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

import "../styles/component/Todos.css";

const Todos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingTodo, setViewingTodo] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter todos based on the search query
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewingTodoData = viewingTodo
    ? todos.find((todo) => todo.id === viewingTodo)
    : null;

  return (
    <div className="todo-container">
      {/* Top Bar */}
      <div className="todo-header">
        <img src="/logo.png" alt="Logo" />
        <h1>Todo App</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button>Search</button>
        </div>
      </div>

      {/* Add Todo Button */}
      <button onClick={handleAddModal} className="btn btn--primary">
        Add New Todo
      </button>

      {/* Add Todo Modal */}
      <AddToDo
        isOpen={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onHandleAddTodo={handleAddTodo}
      />

      {/* Loading and Error States */}
      {loading && <div className="todo-loading">Loading...</div>}
      {error && <div className="todo-error">Error: {error}</div>}

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos?.map((todo) =>
          editingTodoId === todo.id ? (
            <li key={todo.id}>
              <EditToDo
                showEditModal={showModal}
                todo={todo}
                onHandleUpdateTodo={handleUpdateTodo}
                onCancelEdit={handleCancelEdit}
              />
            </li>
          ) : (
            <li key={todo.id}>
              <ToDoList
                todo={{
                  ...todo,
                  createdDate: todo.startDate || "N/A",
                }}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleEditTodo={handleEditTodo}
                onHandleViewTodo={handleViewTodo}
              />
            </li>
          )
        )}
      </ul>

      {/* View Todo Modal */}
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

export default Todos;
