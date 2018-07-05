import React, { Component } from "react";
import * as firebase from "firebase";
import RoomList from "./RoomList";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: "",
      messages: [],
      sentAt: firebase.database.ServerValue.TIMESTAMP,
      roomId: ""
    };
    this.messagesRef = this.props.firebase.database.ref("messages");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      content: event.target.value,
      roomId: this.props.activeRoom
    });
  }

  createMessage(event) {
    event.preventDefault();
    if (!this.state.content) {
      return;
    }
    this.msgRef.push({
      content: this.state.content,
      sentAt: this.state.sentAt,
      username: this.state.username
    });
    this.setState({ message: "" });
  }

  componentDidMount() {
    this.msgRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  render() {
    const activeRoom = this.props.activeRoom;
    const Messages = this.state.messages.map(message => {
      if (message.roomId === activeRoom) {
        return <div key={message.key}>{message.content}</div>;
      }
      return {RoomList};
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
        {newMsgForm}
        {Messages}
      </div>
    );
  }
}

export default MessageList;
