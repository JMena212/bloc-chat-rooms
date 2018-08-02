import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {roomId: "", user: ""};
  }

  setUser(user){
    this.setState({user: user})
    console.log(user)
  }

  selectRoom(room) {
    this.setState({roomId: room.key})

  }


  render() {
    return (
      <div>
        <User setUser={this.setUser.bind(this)}/>
        <RoomList handleClick={this.selectRoom.bind(this)}/>
        <MessageList roomId={this.state.roomId} />
      </div>
    );
  }
}

export default App;
