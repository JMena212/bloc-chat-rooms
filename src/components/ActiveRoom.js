import React, { Component } from "react";
import MessageList from './MessageList'
import * as firebase from "firebase";


class ActiveRoom extends Component {
   constructor(props){
     super(props);
     const roomData = firebase.database().ref("rooms");
     const activeRoom = roomData.find( room => {
          return room.id === this.props.match.params.id
           });

           this.state= {
             room: activeRoom
           }

   }
}

export default ActiveRoom;
