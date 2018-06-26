import React, { Component } from "react";
import * as firebase from "firebase";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [], roomName: "" };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ roomName: event.target.value });
  }


//handlesubmit
  handleRoomCreation(event) {
    event.preventDefault();
    if (!this.state.roomName) { return }
    this.roomsRef.push({ roomName: this.state.roomName });
    this.setState({roomName: ''})
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      var room = { data: snapshot.val(), key: snapshot.key };
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    const Rooms = ({ data }) =>
      data.map(room => <div key={room.key}>{room.data.roomName}</div>);
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
