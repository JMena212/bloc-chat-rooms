import React, { Component } from "react";
import MessageList from "./MessageList";
import firebase from "../lib/firebase.js";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { PageHeader } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../styles/roomlist.css";
import "../styles/normalize.css";

{
  /*

  Hmm I'm not sure that there is anything exactly comparable. Here are the starting steps:
  4. Use it in the ROomList component attached to a click handler as `this.props.setRoom` and pass in the room you map over as the argument.
*/
}

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], roomName: "" };
    this.roomsRef = firebase.database().ref("rooms");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ roomName: event.target.value });
  }

  //handlesubmit
  handleRoomCreation(event) {
    event.preventDefault();
    if (!this.state.roomName) {
      return;
    }
    this.roomsRef.push({ roomName: this.state.roomName });
    this.setState({ roomName: "" });
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key ;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  setRoom(room) {
    this.props.activeRoom(room);
  }

  render() {
    const Rooms = this.state.rooms.map((room) =>
        <Nav bsStyle="pills">
          <NavItem onClick={this.setRoom} key={room.key}>
            {room.roomName}
          </NavItem>
        </Nav>
      );

    const createForm = (
      <form onSubmit={this.handleRoomCreation.bind(this)}>
        <label>
          Create New Chat Room:
          <input
            type="text"
            value={this.state.roomName}
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

    return (
      <div className="Roomlist">
        <PageHeader>Bloc Chat Rooms</PageHeader>
        {createForm}
        <h2> Join a Chat Room </h2>
        {Rooms}
      </div>
    );
  }
}

export default RoomList;
