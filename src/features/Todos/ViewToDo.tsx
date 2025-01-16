import Modal from '../../components/Modal/Modal';
import { ViewTodoProps } from '../../types/todo';

import '../../styles/component/Button.css';
import '../../styles/component/View.css';

const ViewTodo: React.FC<ViewTodoProps> = ({ todo, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Todo Details'>
      <div className='view-todo'>
        <div className='view-todo__header'>
          <h2>{todo.title}</h2>
        </div>
        <div className='view-todo__content'>
          <div className='view-todo__field'>
            <h3 className='view-todo__label'>Description</h3>
            <p className='view-todo__value'>
              {todo.description || 'No description provided.'}
            </p>
          </div>
          <div className='view-todo__details'>
            <div className='view-todo__field'>
              <h3 className='view-todo__label'>Start Date</h3>
              <p className='view-todo__value'>{todo.startDate || 'N/A'}</p>
            </div>
            <div className='view-todo__field'>
              <h3 className='view-todo__label'>End Date</h3>
              <p className='view-todo__value'>{todo.endDate || 'N/A'}</p>
            </div>
          </div>
          <div className='view-todo__field'>
            <h3 className='view-todo__label'>Status</h3>
            <p
              className={`view-todo__status ${
                todo.completed ? 'completed' : 'pending'
              }`}
            >
              {todo.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
        </div>
        <div className='modal-footer'>
          <button onClick={onClose} className='btn btn--primary'>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTodo;
