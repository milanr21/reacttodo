import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import MainLogoImg from "../../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";

import { isEmpty } from "../../utils/isEmpty";

import AddToDo from "../../features/Todos/AddToDo";
import ViewTodo from "../../features/Todos/ViewToDo";
import EditToDo from "../../features/Todos/EditToDo";
import ToDoList from "../../features/Todos/ToDoList";
import {
  addTodoSuccess,
  getTodo,
  deleteTodoSuccess,
  updateTodoSuccess,
  getTodoSuccess,
  toggleCompleteTodo,
} from "../../features/Todos/store/TodoSlice";

import { RootState, AppDispatch } from "../../store/store";
import { SortableList } from "../../Sortable/SortableList";

import "../../styles/component/Todos.css";
import { Todo } from "../../types/todo";

const Todos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingTodo, setViewingTodo] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { todos } = useSelector((state: RootState) => state.todo);

  const [items, setItems] = useState(todos);

  useEffect(() => {
    setItems(todos);
  }, [todos]);

  const loadFromLocalStorage = (key: string): string | null => {
    const item = localStorage.getItem(key);
    return item ? item : null;
  };

  useEffect(() => {
    const storedTodos = loadFromLocalStorage("todos");

    let loadLocalStorage: {
      id: string;
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      completed: boolean;
    }[] = [];
    try {
      loadLocalStorage = storedTodos ? JSON.parse(storedTodos) : [];
    } catch (e) {
      console.error("Error parsing localStorage data", e);
      loadLocalStorage = [];
    }

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
    setShowModal(true);
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
    setShowModal(false);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setShowModal(false);
  };

  const handleViewTodo = (todoId: string) => {
    setViewingTodo(todoId);
  };

  const handleToggleComplete = (id: string) => {
    dispatch(toggleCompleteTodo(id));
  };

  const handleCloseView = () => {
    setViewingTodo(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const viewingTodoData = viewingTodo
    ? todos.find((todo) => todo.id === viewingTodo)
    : null;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <img src={MainLogoImg} alt="Logo" />
        <div className="search-bar">
          <input
            type="text"
            placeholder="search...."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button>Search</button>
        </div>
      </div>

      <div>
        <button onClick={handleAddModal} className="btn btn--primary">
          <Plus /> <span>Add</span>
        </button>
      </div>

      <AddToDo
        isOpen={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onHandleAddTodo={handleAddTodo}
      />

      {editingTodoId && (
        <EditToDo
          showEditModal={showModal}
          //showEditModal={showModal}
          todo={todos.find((todo) => todo.id === editingTodoId)!}
          onHandleUpdateTodo={handleUpdateTodo as (updatedTodo: Todo) => void}
          onCancelEdit={handleCancelEdit}
        />
      )}

      {isEmpty(items) ? (
        <p className="empty-todo-message">
          No todos yet! Start by adding your first task to stay organized.
        </p>
      ) : (
        <SortableList
          items={filteredTodos}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item id={item.id} key={item.id}>
              <ToDoList
                todo={{
                  ...item,
                  createdDate: item.startDate || "N/A",
                }}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleEditTodo={handleEditTodo}
                onHandleViewTodo={handleViewTodo}
                onHandleToggleComplete={handleToggleComplete}
              />
              <button
                onClick={() => handleToggleComplete(item.id)}
                className={`btn ${
                  item.completed ? "btn--success" : "btn--secondary"
                }`}
              >
                {item.completed ? "Mark Completed" : "Mark Incompleted"}
              </button>
            </SortableList.Item>
          )}
        />
      )}

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
