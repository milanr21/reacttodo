import Modal from "./Modal/Modal";
import "../styles/component/Button.css";

interface ViewTodoProps {
  todo: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ViewTodo: React.FC<ViewTodoProps> = ({ todo, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Todo Details">
      <div className="view-todo">
        <div className="view-todo__content">
          <div className="view-todo__field">
            <h3 className="view-todo__label">Title</h3>
            <p className="view-todo__value">{todo.title}</p>
          </div>
          {todo.description && (
            <div className="view-todo__field">
              <h3 className="view-todo__label">Description</h3>
              <p className="view-todo__value">{todo.description}</p>
            </div>
          )}
          <div className="view-todo__field">
            <h3 className="view-todo__label">Status</h3>
            <p className="view-todo__value">
              {todo.completed ? "Completed" : "Pending"}
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn--primary">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTodo;
