import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import '.././styles/chat.css'

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
      roomId: this.props.roomId,
      user: this.props.displayUser
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
    var activeMessages = this.state.messages.filter(this.activeRoomMessage.bind(this));
    const Messages = activeMessages.map(message => (
      <li className="Messages" key={message.key}>{message.content} user:{message.user}</li>
    ));


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
      <div className="chat-box">
        {Messages}
        {newMsgForm}
      </div>
    );
  }
}

export default MessageList;
