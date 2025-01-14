import { useState } from "react";
import "../styles/component/Button.css";
import "../styles/component/Input.css";

interface AddToDoProps {
  onHandleAddTodo: (newTodo: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ onHandleAddTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim() === "") return;

    const newTodoItem = {
      id: Date.now().toString(),
      title: newTodo,
      description: "",
      completed: false,
    };

    onHandleAddTodo(newTodoItem);
    setNewTodo("");
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleAddTodo}>
        <div className="input-group">
          <label className="input-label" htmlFor="new-todo">
            Title
          </label>
          <input
            id="new-todo"
            type="text"
            value={newTodo}
            onChange={handleTitleChange}
            className="input-field"
            placeholder="Add a new todo"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="new-description">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="input-field textarea-field"
            id="new-description"
            placeholder="Add a description"
          />
        </div>
        <button type="submit" className="btn btn--primary">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddToDo;
