import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import RoomList from "./RoomList";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: "",
      messages: [],
      sentAt: "",
      roomId: ""
    };
    this.messagesRef = firebase.database().ref("messages");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      content: event.target.value,
      sentAt: "",
      username: this.state.username,
      roomId: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.content) {
      return;
    }
    this.messagesRef.push({
      content: this.state.content,
      sentAt: this.state.sentAt,
      username: this.state.username,
      roomId: this.state.roomId
    });
    this.setState({ message: "" });
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  render() {
    const Messages = this.state.messages.map(message => {
      if (message.roomId === this.props.activeRoom) {
        return <li key={message.key}>{message.content}</li>;
      }
      return null;
    });

    const newMsgForm = (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Message:
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

    return (
      <div>
        {Messages}
        {newMsgForm}
      </div>
    );
  }
}

export default MessageList;
