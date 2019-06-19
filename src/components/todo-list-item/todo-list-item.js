import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({ important, done, edit, name, email,
      label, onToggleImportant, onToggleDone, onDelete, EditText, EditItem }) => {
  
  let classNames = 'todo-list-item';
  if (important) {
    classNames += ' important';
  }

  if (done) {
    classNames += ' done';
  }
  if (edit) {
    classNames += ' edit';
  }
  

  return (

    <span className={classNames}>
      <div
        className="todo-list-item-name"
        onClick={onToggleDone} >{name}</div>

      <div
        className="todo-list-item-email"
        onClick={onToggleDone} >{email}</div>  

      <div
        className="todo-list-item-label"
        onClick={onToggleDone} >{label}</div>

        <input 
              value = {label} onChange = { EditText } />

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImportant}>
        <i className="fa fa-exclamation"></i>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDelete}>
        <i className="fa fa-trash-o"></i>
      </button>
      <button type="button"
              className="btn btn-outline-primary btn-sm float-right"
              onClick={ EditItem } >
              <span className="todo-list-item-edit">edit</span>
              <span className="todo-list-item-save">save</span>
      </button>
    </span>
  );
};

export default TodoListItem;
