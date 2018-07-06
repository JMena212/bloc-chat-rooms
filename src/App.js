import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeRoom: "", roomId: "" };
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    const activeRoom = this.state.activeRoom;
    return (
      <div>
        <RoomList />
        <MessageList />

      </div>

    );
     <div>
     <MessageList roomId={this.state.roomId}/>
     <RoomList roomId={this.state.roomId}/>
     </div>
  }
}

export default App;
