import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

class App extends Component {
  constructor(props) {
    super(props);
    var roomPath = window.location.pathname.substr(1);
    this.state = { activeRoom: "", roomId: roomPath };
  }



  render() {
    return (
      <div>
        <RoomList />
        <MessageList roomId={this.state.roomId} />
      </div>
    );
  }
}

export default App;
