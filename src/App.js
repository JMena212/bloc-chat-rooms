import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

class App extends Component {
  constructor(props) {
    super(props);
    var roomPath = window.location.pathname.substr(1);
    this.state = { activeRoom: "", roomId: roomPath };
  }

  handleClick(e) {
    e.preventDefault();
    console.log("The room name was clicked.");
  }

  render() {
    return (
      <div>
        <RoomList handleClick={this.handleClick} />
        <MessageList roomId={this.state.roomId} />
      </div>
    );
  }
}

export default App;
