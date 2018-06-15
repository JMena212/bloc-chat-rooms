import React, { Component } from "react";
import * as firebase from "firebase";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  handleRoomCreation(event) {
    event.preventDefault();
    this.roomsRef.push({ room_name: this.state.roomName });
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      var room = { roomName: snapshot.val(), key: snapshot.key };
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    console.error(this.state.rooms)
    return (
      <div>
        <Rooms data={this.state.rooms} />
        <Form
          handleRoomCreation={this.handleRoomCreation}
          handleChange={this.handleChange}
          roomName={this.state.roomName}
        />
      </div>
    );
  }
}

export default RoomList;

const Rooms = ({data}) => data.map(room => <div key={room.key}>{room.roomName} </div>)

const Form = ({ handleRoomCreation, handleChange, roomName }) => (
  <form onSubmit={handleRoomCreation}>
    <label>
      Room Name:
      <input type="text" value={roomName} onChange={handleChange} />
    </label>
    <input type="submit" value="Submit" />
  </form>
);
