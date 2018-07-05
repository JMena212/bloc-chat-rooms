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
    this.state = { activeRoom: "" };
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {

    return (
      <div>
        <Route exact path="/" component={RoomList} />
        <Route path="/rooms/:id" component={MessageList} />
      </div>

    );
    <div>
    <RoomList setRoom={this.setRoom.bind(this)} />
    <RoomList activeRoom={this.state.activeRoom} />
    </div>
  }
}

export default App;
