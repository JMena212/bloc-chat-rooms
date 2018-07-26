import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {roomId: ""};
  }

  selectRoom(room) {
    this.setState({roomId: room.key})

  }


  render() {
    return (
      <div>
        <User/>
        <RoomList handleClick={this.selectRoom.bind(this)}/>
        <MessageList roomId={this.state.roomId} />
      </div>
    );
  }
}

export default App;
