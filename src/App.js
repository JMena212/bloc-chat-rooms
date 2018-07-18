import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeRoom: "", roomId: ""  };
  }

  selectRoom(room) {
    this.setState({roomId: room.key})
  }


  render() {
    return (
      <div>
        <RoomList handleClick={this.selectRoom.bind(this)}/>
        <MessageList roomId={this.state.roomId} />
      </div>
    );
  }
}

export default App;
