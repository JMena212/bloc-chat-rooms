import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import { PageHeader } from "react-bootstrap";
import '.././styles/chat.css'



class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], roomName: ""};
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
      console.log(snapshot.key);
    });
  }

  render() {

      const Rooms = this.state.rooms.map((room,index) => (
        <div  key={index}>
          <span onClick={ () => this.props.handleClick(room) }>
            {room.roomName}
          </span>
        </div>
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
      <div>
      <PageHeader>Bloc Chat Rooms</PageHeader>
      {createForm}
      <h2> Join a Chat Room </h2>
      <div className="roomlist"> {Rooms}</div>
      </div>

    );
  }
}

export default RoomList;
