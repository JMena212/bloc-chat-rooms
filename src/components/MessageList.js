import React, { Component } from "react";
import * as firebase from "firebase";

class MessageList extends Component {
 constructor(props){
   super(props);
   this.state = { username: "<USERNAME HERE>",
    content: "<CONTENT OF THE MESSAGE HERE>",
    sentAt: "<TIME MESSAGE WAS SENT HERE>",
    roomId: "<ROOM UID HERE>"}
    this.msgRef = this.props.firebase.database().ref("messages");
 }


 componentDidMount() {
   this.roomsRef.on("child_added", snapshot => {
     var message = { data: snapshot.val(), key: snapshot.key };
     this.setState({ rooms: this.state.rooms.concat(room) });
   });
 }


}
