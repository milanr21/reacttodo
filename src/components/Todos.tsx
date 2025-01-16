import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddToDo from "./AddToDo";
import ToDoList from "./ToDoList";
import EditToDo from "./EditToDo";

import MainLogoImg from "../assets/Logo.png";
import { Plus } from "lucide-react";

import {
  addTodoSuccess,
  getTodo,
  deleteTodoSuccess,
  updateTodoSuccess,
  getTodoSuccess,
} from "../features/Todos/store/TodoSlice";

import { RootState, AppDispatch } from "../store/store";
import ViewTodo from "./ViewToDo";
import { loadFromLocalStorage } from "../utils/localStorage";

import "../styles/component/Todos.css";
import { SortableList } from "../Sortable/SortableList";

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

  const [items, setItems] = useState(todos);

  useEffect(() => {
    setItems(todos);
  }, [todos]);

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
          showEditModal={!!editingTodoId}
          //showEditModal={showModal}
          todo={todos.find((todo) => todo.id === editingTodoId)!}
          onHandleUpdateTodo={handleUpdateTodo}
          onCancelEdit={handleCancelEdit}
        />
      )}

      <SortableList
        items={filteredTodos}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <ToDoList
              todo={{
                ...item,
                createdDate: item.startDate || "N/A",
              }}
              onHandleDeleteTodo={handleDeleteTodo}
              onHandleEditTodo={handleEditTodo}
              onHandleViewTodo={handleViewTodo}
            />

            {/* <SortableItems item={item} /> */}

            <SortableList.Item id={item.id} />
          </SortableList.Item>
        )}
      ></SortableList>

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
