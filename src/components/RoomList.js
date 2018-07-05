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
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    const Rooms = this.state.rooms.map(room => (
      <Nav bsStyle="pills">
        <a href={`/rooms/${room.roomName}`} onClick={this.props.setRoom.bind(this)} key={room.key}>
          {room.roomName}
        </a>
      </Nav>
    ));

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
