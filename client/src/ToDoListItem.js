import React, { Component } from "react";
import "./ToDoListItem.css";

class ToDoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }

  onChange(e) {
    this.props.onChangeChecked(this.props.id);
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const description = this.state.checked ? (
      <del>{this.props.description}</del>
    ) : (
      this.props.description
    );
    const date = this.props.date;

    return (
      <div className="ToDoListItem">
        <input type="checkbox" onChange={(e) => this.onChange(e)}></input>
        <div className="ToDoListItem-description">{description}</div>
        <div className="ToDoListItem-deadline">{date}</div>
      </div>
    );
  }
}

export default ToDoListItem;
