import React, { Component } from "react";
import * as firebase from "firebase";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], roomName: "" };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  handleRoomCreation(event) {
    event.preventDefault();
    this.roomsRef.push({ roomName: this.state.roomName });
    this.setState({ roomName: event.target.roomName });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ roomName: event.target.value });
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      var room = { roomName: snapshot.val(), key: snapshot.key };
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    const Rooms = ({ data }) =>
      data.map(room => <div key={room.key}>{room.roomName}</div>);
  console.log("ROOM NAME: ", this.state.roomName)
    return (
      <div>
        <Rooms data={this.state.rooms} />
        <form onSubmit={this.handleRoomCreation.bind(this)}>
          <label>
            Room Name:
            <input
              type="text"
              value={this.state.roomName}
              onChange={this.handleChange.bind(this)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default RoomList;
