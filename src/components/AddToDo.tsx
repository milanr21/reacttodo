import { useState } from "react";
import "../styles/component/Button.css";
import "../styles/component/Input.css";
import Modal from "./Modal/Modal";

interface AddToDoProps {
  handleClose: () => void;
  isOpen: boolean;
  onHandleAddTodo: (newTodo: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    completed: boolean;
  }) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({
  onHandleAddTodo,
  handleClose,
  isOpen,
}) => {
  const [newTodo, setNewTodo] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

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
      description: description,
      startDate: startDate,
      endDate: endDate,
      completed: false,
    };

    onHandleAddTodo(newTodoItem);
    setNewTodo("");
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Todo">
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
            <label className="input-label" htmlFor="start-date">
              Start Date and Time
            </label>
            <input
              id="start-date"
              type="datetime-local"
              value={startDate}
              onChange={handleStartDateChange}
              className="input-field"
              placeholder="Start Date and Time"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="end-date">
              End Date and Time
            </label>
            <input
              id="end-date"
              type="datetime-local"
              value={endDate}
              onChange={handleEndDateChange}
              className="input-field"
              placeholder="Start Date adn Time"
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

          <div className="modal-footer">
            <button type="submit" className="btn btn--primary">
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddToDo;
