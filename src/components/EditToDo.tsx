import { useState } from "react";
import Modal from "./Modal/Modal";

interface EditToDoProps {
  todo: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  onHandleUpdateTodo: (updatedTodo: {
    id: string;
    title: string;
    description: string;
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
    };

    onHandleUpdateTodo(updatedTodo);
  };

  return (
    <Modal isOpen={true} onClose={onCancelEdit}>
      <form onSubmit={handleUpdateTodo}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Edit todo title"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Edit todo description"
        />
        <button type="submit">Update Todo</button>
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default EditToDo;
