import React, { Component } from 'react';
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


export default class App extends Component {

  state = {
    items: [
      { id: 1, name: 'Alex', email: 'test@mail.com', label: 'Drink Coffee', important: false, done: true, edit: false },
      { id: 2, name: 'Oleg', email: 'test2@mail.com', label: 'Learn React', important: true, done: false, edit: false },
      { id: 3, name: 'Vlad', email: 'test3@mail.com', label: 'Make Awesome App', important: false, done: false, edit: false },
      { id: 4, name: 'Nastia', email: 'test@mail.com', label: 'Drink Coffee', important: false, done: true, edit: false },
      { id: 5, name: 'Ihor', email: 'test2@mail.com', label: 'Learn React', important: true, done: false, edit: false },
      { id: 6, name: 'Kiril', email: 'test3@mail.com', label: 'Make Awesome App', important: false, done: false, edit: false },
      { id: 7, name: 'Alla', email: 'test@mail.com', label: 'Drink Coffee', important: false, done: true, edit: false },
      { id: 8, name: 'Ilona', email: 'test2@mail.com', label: 'Learn React', important: true, done: false, edit: false },
      { id: 9, name: 'Kolia', email: 'test3@mail.com', label: 'Make Awesome App', important: false, done: false, edit: false },
      { id: 10, name: 'Andrey', email: 'test@mail.com', label: 'Drink Coffee', important: false, done: true, edit: false },
      { id: 11, name: 'Sasha', email: 'test2@mail.com', label: 'Learn React', important: true, done: false, edit: false },
      
    ],
    filter: 'all',
    search: '',
    activePage: 1
  };


  onItemAdded = (label, name, email) => {
    this.setState((state) => {
      const item = this.createItem(label, name, email);
      return { items: [...state.items, item] };
    })
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value } ;
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'done');
      return { items };
    });
  };

  onToggleImportant = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'important');
      return { items };
    });
  };

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1)
      ];
      return { items };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onSearchChange = (search) => {
    this.setState({ search });
  };

  createItem(label, name, email) {
    return {
      id: ++this.maxId,
      label,
      name,
      email,
      important: false,
      done: false,
      edit: false
    };
  }

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter((item) => (!item.done));
    } else if (filter === 'done') {
      return items.filter((item) => item.done);
    }
  }

  searchItems(items, search) {
    return items.filter((item) => { 
        if( item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ) {
          return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        } else {
          return item.email.toLowerCase().indexOf(search.toLowerCase()) > -1;
        }
      })
    }


  EditText = (val, id, propName) => {
    const idx = this.state.items.findIndex((item) => item.id === id);
    const value = val;

    const item = { ...this.state.items[idx], [propName]: value } ;
    const newArr = [
      ...this.state.items.slice(0, idx),
      item,
      ...this.state.items.slice(idx + 1)
    ];
    this.setState ({items: newArr})
  }

  EditItem = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'edit');
      return { items };
    });  
  }

  handlePageChange = (event) => {
    if(event.target.parentNode.classList.contains('paginatContainer')){
      return;
    }
    
    let childLength = event.target.parentNode.children;
    let lastPage = childLength.length - 2;

    for(let i=1; i<childLength.length; i++){
      childLength[i].classList.remove("active")
    }
    
    this.setState({activePage: event.target.innerText});
    
    if (event.target.classList.contains('leftbtn')){
      this.setState({activePage: 1});
      childLength[1].classList.add("active")
      return;
    } else if (event.target.classList.contains('rightbtn')){
      this.setState({activePage: lastPage});
      childLength[lastPage].classList.add("active")
      return;
    } 

    event.target.classList.add("active")
    //console.log(event.target);
   
  }

  render() {

    const { items, filter, search, activePage  } = this.state;
    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = this.searchItems(this.filterItems(items, filter), search);
   

    
    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount}/>

        <div className="search-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}/>

          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          items={ visibleItems }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDelete={this.onDelete}
          EditText = {this.EditText}
          EditItem ={this.EditItem}
          handlePageChange = {this.handlePageChange}
          activePage = {activePage}
           />

        <ItemAddForm
          onItemAdded={this.onItemAdded} />
        
      </div>
    );
  };
}
