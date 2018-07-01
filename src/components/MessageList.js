import React, { Component } from "react";
import * as firebase from "firebase";
import RoomList from './RoomList';



class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: "",
      messages: [],
      sentAt: firebase.database.ServerValue.TIMESTAMP,
      /*roomId: room.data.roomName*/
    };
    this.msgRef = this.props.firebase.database().ref("messages");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }

  //handlesubmit
  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.content) {
      return;
    }
    this.msgRef.push({ content: this.state.content });
    this.setState({ message: "" });
  }

  componentDidMount() {
    this.msgRef.on("child_added", snapshot => {
      var message = { data: snapshot.val(), key: snapshot.key };
      this.setState({ Messages: this.state.messages.concat(message) });
    });
  }

  render() {
    const Messages = ({ data }) =>
      data.map(message => <div key={message.key}>{message.data.content}</div>);
    return (
      <div>
        <Messages data={this.state.messages} />
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
      </div>
    );
  }
}

export default MessageList;
