import React, { Component } from "react";
import * as firebase from "firebase";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], roomName: ""};
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  handleRoomCreation(event) {
    event.preventDefault();
    this.roomsRef.push({ roomName: this.state.roomName });
    this.setState({roomName: ""})
  }

  handleChange(event){
    event.preventDefault();
    this.setState({roomName: event.target.value})
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      var room = { roomName: snapshot.val(), key: snapshot.key };
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
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
