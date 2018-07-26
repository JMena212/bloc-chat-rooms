import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import '.././styles/chat.css'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.messagesRef = firebase.database().ref("messages");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      username: this.state.username
    });
  }

  handleClick(event) {
    event.preventDefault();
    if (!this.state.content) {
      return;
    }
    this.messagesRef.push({
      content: this.state.content,
      sentAt: "today",
      roomId: this.props.roomId
    });
    this.setState({ content: "" });
  }

activeRoomMessage (message){
  if (message.roomId === this.props.roomId) {
    return true;
  } else {
    return false;
  }
};

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat(message) });
      });
  }

  render() {
    <button> Sign In </button>


    return (
      <div>

      </div>
    );
  }
}

export default MessageList;
