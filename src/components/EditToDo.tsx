import { useState } from "react";
import Modal from "./Modal/Modal";
import "../styles/component/Input.css";
import "../styles/component/Button.css";

interface EditToDoProps {
  todo: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    completed: boolean;
  };
  onHandleUpdateTodo: (updatedTodo: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    completed: boolean;
  }) => void;
  onCancelEdit: () => void;
}

const EditToDo: React.FC<EditToDoProps> = ({
  todo,
  onHandleUpdateTodo,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [startDate, setStartDate] = useState(todo.startDate);
  const [endDate, setEndDate] = useState(todo.endDate);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") return;

    const updatedTodo = {
      ...todo,
      title: title,
      description: description,
      startDate: todo.startDate,
      endDate: todo.endDate,
    };

    onHandleUpdateTodo(updatedTodo);
  };

  return (
    <Modal isOpen={true} title="Edit ToDO" onClose={onCancelEdit}>
      <form onSubmit={handleUpdateTodo}>
        <div className="input-group">
          <label className="input-label" htmlFor="title">
            Title
          </label>
          <div>
            <input
              id="title"
              type="text"
              value={title}
              className="input-field"
              onChange={handleTitleChange}
              placeholder="Edit todo title"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="input-field textarea-field"
            placeholder="Edit todo description"
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

        <div className="modal-footer">
          <button
            type="button"
            onClick={onCancelEdit}
            className="btn btn--outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Update Todo
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditToDo;
