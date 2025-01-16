import React from 'react';
import { Edit, Trash, Eye, Power } from 'lucide-react';

import { ToDoListProps } from '../../types/todo';

import '../../styles/component/TodoList.css';
import { SortableList } from '../../Sortable/SortableList';

const ToDoList: React.FC<ToDoListProps> = ({
  todo,
  onHandleDeleteTodo,
  onHandleEditTodo,
  onHandleViewTodo,
  onHandleToggleComplete,
}) => {
  return (
    <div className='todo-item'>
      <div className='todo-item__header'>
        <h3 className='todo-item__title'>{todo.title}</h3>
      </div>
      <p className='todo-item__description'>{todo.description}</p>
      <div className='todo-item__date'>
        {todo.completed ? 'Completed' : 'Updated on'}:{' '}
        {new Date().toLocaleDateString()}
      </div>
      <div className='todo-item__actions'>
        <SortableList.DragHandle />

        <div className='todo-item__actions-right'>
          <button
            onClick={() => onHandleViewTodo(todo.id)}
            className='icon-btn'
            title='View Todo'
          >
            <Eye size={20} />
          </button>
          <button
            onClick={() => onHandleEditTodo(todo.id)}
            className='icon-btn'
            title='Edit Todo'
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onHandleDeleteTodo(todo.id)}
            className='icon-btn icon-btn--danger'
            title='Delete Todo'
          >
            <Trash size={20} />
          </button>

          <button
            onClick={() => onHandleToggleComplete(todo.id)}
            className='icon-btn'
            title='Complete Todo'
          >
            <Power size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
