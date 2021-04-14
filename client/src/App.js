import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ToDoListItem from "./ToDoListItem.js";
import ToDoListForm from "./ToDoListForm.js";
import ToDoRemoveButton from "./ToDoRemoveButton.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      todoCount: 0,
    };
  }

  componentDidMount() {
    const todoList = [];
    axios.get("/todo").then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const todo = res.data[i];
        todoList.push({
          id: todo.id,
          description: todo.description,
          deadline: todo.deadline,
          checked: false,
        });
      }
      this.setState({ todoList: todoList, todoCount: todoList.length });
    });
  }

  handleFormSubmit(desc, date) {
    const todoList = this.state.todoList;
    const new_id = this.state.todoCount + 1;

    console.log(todoList);

    axios.post("/todo", { id: new_id, description: desc, deadline: date });
    this.setState({
      todoList: todoList.concat([
        {
          id: new_id,
          description: desc,
          date: date,
          checked: false,
        },
      ]),
      todoCount: new_id,
    });
  }

  onChangeChecked(id) {
    const todoList = this.state.todoList.slice();

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        todoList[i].checked = !todoList[i].checked;
        break;
      }
    }
  }

  onClickDone() {
    const todoList = this.state.todoList;

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].checked) {
        axios.delete(`/todo/${todoList[i].id}`);
      }
    }

    this.setState({ todoList: todoList.filter((x) => !x.checked) });
  }

  render() {
    return (
      <div className="App">
        <div className="Todo-list-form">
          <ToDoListForm
            onFormSubmit={(desc, date) => this.handleFormSubmit(desc, date)}
          />
        </div>

        <div className="Todo-remove-button">
          <ToDoRemoveButton onClickDone={() => this.onClickDone()} />
        </div>

        <div>
          {this.state.todoList.map((todo) => (
            <ToDoListItem
              key={todo.id}
              id={todo.id}
              description={todo.description}
              date={todo.date}
              checked={todo.checked}
              onChangeChecked={(key) => this.onChangeChecked(key)}
              // onClick={() =>
              //   this.setState({
              //     todoList: this.state.todoList.filter((x) => x !== todo),
              //   })
              // }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
