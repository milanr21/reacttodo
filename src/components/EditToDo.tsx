import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import "../styles/component/Input.css";
import "../styles/component/Button.css";

interface EditToDoProps {
  showEditModal: boolean;
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
  showEditModal,
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

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
    setStartDate(todo.startDate);
    setEndDate(todo.endDate);
  }, [todo]);

  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") return;

    const updatedTodo = {
      ...todo,
      title: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
    };

    onHandleUpdateTodo(updatedTodo);
  };

  return (
    <Modal isOpen={showEditModal} title="Edit Todo" onClose={onCancelEdit}>
      <form onSubmit={handleUpdateTodo}>
        <div className="input-group">
          <label className="input-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            className="input-field"
            onChange={handleTitleChange}
            placeholder="Edit todo title"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="input-field textarea-field"
            placeholder="Edit todo description"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="start-date">
            Start Date & Time
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
            End Date & Time
          </label>
          <input
            id="end-date"
            type="datetime-local"
            value={endDate}
            onChange={handleEndDateChange}
            className="input-field"
            placeholder="End Date and Time"
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
          <button type="submit" className="btn btn--primary ">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditToDo;
