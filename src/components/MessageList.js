import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import RoomList from "./RoomList";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      messages: []
    };
    this.messagesRef = firebase.database().ref("messages");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      content: event.target.value,
      username: this.state.username
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.content) {
      return;
    }
    this.messagesRef.push({
      content: this.state.content,
      sentAt: "today",
      roomId: this.props.roomId
    });
    this.setState({ message: "" });
  }

  componentDidMount() {
    this.messagesRef
      .orderByChild("roomId")
      .equalTo(this.props.roomId)
      .on("child_added", snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat(message) });
      });
  }

  render() {
    const Messages = this.state.messages.map(message => (
      <li className="Messages" key={message.key}>{message.content}</li>
    ));
    console.log(this.props.roomId);

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
