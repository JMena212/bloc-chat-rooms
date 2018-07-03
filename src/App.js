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
    this.state = { activeRoom: null };
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={RoomList} />
        <Route path="/room/:id" component={MessageList} />
      </div>

    );
    <RoomList setRoom={this.setRoom.bind(this)} />
  }
}

export default App;
