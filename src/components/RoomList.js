import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
      super(props);
      this.state = {rooms: []};
       this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {

      this.roomsRef.on('child_added', snapshot => {
        var room = {room_name: snapshot.val(), key: snapshot.key()}
        this.setState({ rooms: this.state.rooms.concat( room ) });
      });
    }


    render() {
      console.log(this.state.rooms.length);
        return (
                this.state.rooms.map((room, key) => {
                                return (<div key={room.key}>{room.room_name} </div>)

                              })

                );
    }

}


export default RoomList;
