import React, { Component } from "react";
import "./ToDoRemoveButton.css";

class ToDoRemoveButton extends Component {
  render() {
    return (
     <button className="Todo-Remove-Button" onClick={this.props.onClickDone}>
        done!
      </button>
    );
  }
}

export default ToDoRemoveButton;
