import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';
import Paginat from '../paginations'


const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete, EditText, EditItem,
                    handlePageChange, activePage}) => {
 
  let elements = [];

    for(let i=activePage*3-3; i<activePage*3; i++) {
      if( i > items.length - 1) break;

      const { id, ...itemProps } = items[i];

      elements.push(
          <li key={id} className="list-group-item">
          <TodoListItem
            { ...itemProps }
            onToggleImportant={ () => onToggleImportant(id) }
            onToggleDone={ () => onToggleDone(id) }
            onDelete={ () => onDelete(id) }
            EditText = { (e) => EditText(e.target.value, id, "label" ) }
            EditItem = {() => EditItem(id)}
            />
        </li>
      )
    }          

    return (
      <div>
          <ul className="todo-list list-group" >
            {elements}
          </ul>
          <Paginat 
            items={items}
            handlePageChange={(e) => handlePageChange(e)}/>
      </div>    
     );
  }

export default TodoList;
