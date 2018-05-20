import React from 'react';
import FlipMove from 'react-flip-move';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.getOldTodo = this.getOldTodo.bind(this);
    this.state = {input: '', todos: this.getOldTodo()};
  }
  
  handleSubmit(event) {
    let newTodos = this.state.todos;
    if (this.state.input !== "") {
      newTodos.unshift({
        text: this.state.input,
        key: new Date().getTime(),
        selected: false
      });
    }
    this.setState({todos: newTodos, input: ""});
    this.setLocalStorage();
    event.preventDefault(); 
  }
  
  handleChange(e) {
    this.setState({input: e.target.value});
  }

  deleteItem(idx) {
    let todoItems = this.state.todos;
    todoItems.splice(idx, 1); 

    this.setState({
      todos: todoItems
    });
    this.setLocalStorage();
  }

  selectItem(idx) {
    let todos = this.state.todos
    if (todos[idx] !== undefined) {
      todos[idx].selected = !todos[idx].selected;
      this.setState({todos: todos});
      this.setLocalStorage();
    }
  }
  
  setLocalStorage() {
    let todoData = this.state.todos;
    localStorage.removeItem('todoData');
    localStorage.setItem('todoData', JSON.stringify(todoData));
  }
    
  getOldTodo() {
    let localStorageItem = JSON.parse(localStorage.getItem('todoData'));
    if ( localStorageItem == null ) {
      return [];
    }
    return localStorageItem;
  }

  render() {
    return (
      <div className="todo-holder">
        <form className="todoInput-holder" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="To do..." value={this.state.input} onChange={this.handleChange} />
        </form>
        <ul id="todo-list">
          <FlipMove duration={250} easing="ease-out">
          {this.state.todos.map((todo, idx) => (
            <li
              key={todo.key}
              className={'todo-li-item'}
              onClick={this.selectItem.bind(this, idx)}
            >
              <span className="todo-item">{todo.text}</span>
              <span
                onClick={this.deleteItem.bind(this, idx)}
                className="delete-todo"
              >
                &#10005;
              </span>
              <div id="todo-select" className={todo.selected ? "active" : "hidden"}>
                <span id="todo-select-top" />
                <span id="todo-select-left" />
              </div>
            </li>
          ))}
          </FlipMove>
        </ul>
      </div>
    )
  }

}

export default Todo;