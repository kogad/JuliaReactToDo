import React, { Component } from "react";
import "./ToDoListForm.css";

class ToDoListForm extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", date: new Date().toJSON().slice(0, 10) };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(this.state.description, this.state.date);
    this.setState({ description: "" });
  }

  onChangeDesctiprion(e) {
    this.setState({ description: e.target.value });
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  render() {
    return (
      <form className="Todo-form" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="Todo-form-description">
          <textarea
            id="description"
            onChange={(e) => this.onChangeDesctiprion(e)}
            value={this.state.description}
            placeholder="todo"
          />
        </div>
        <div className="Todo-form-date">
          <input
            type="date"
            value={this.state.date}
            onChange={(e) => this.onChangeDate(e)}
          ></input>
        </div>
        <div className="Todo-form-submit">
          <button type="submit" disabled={!this.state.description}>
            add
          </button>
        </div>
      </form>
    );
  }
}

export default ToDoListForm;
