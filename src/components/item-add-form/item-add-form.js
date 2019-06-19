import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

  state = {
    label: '',
    name: '',
    email: ''
  };

  onLabelChange = (e, propName) => {
    switch (propName) {
      case 'label': {
        this.setState({
          label: e.target.value
        })
        break
      }
      case 'name': {
        this.setState({
          name: e.target.value
        })
        break
      }
      case 'email': {
        this.setState({
          email: e.target.value
        })
       break
      }
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, name, email } = this.state;
    this.setState({ 
                    label: '',
                    name: '',
                    email: '' 
                  });
    const cb = this.props.onItemAdded || (() => {});
    cb(label, name, email );
  };

  render() {
    return (
      <form
        className="bottom-panel d-flex"
        onSubmit={this.onSubmit}>

        <input type="name"
               className="form-control new-todo-label"
               value={this.state.name}
               onChange={(e) => this.onLabelChange(e, "name")}
               placeholder="Write your name" />

        <input type="email"
               className="form-control new-todo-label"
               value={this.state.email}
               onChange={(e) => this.onLabelChange(e, "email")}
               placeholder="Write your email" />       

        <input type="text"
               className="form-control new-todo-label"
               value={this.state.label}
               onChange={(e) => this.onLabelChange(e, "label")}
               placeholder="What needs to be done?" />

        <button type="submit"
                className="btn btn-outline-secondary">Add</button>
      </form>
    );
  }
}
