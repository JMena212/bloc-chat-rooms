import React, { Component } from "react";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";
import firebase from "./lib/firebase.js";
import x from "firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { roomId: "", user: null };
    this.userRef = new x.auth.GoogleAuthProvider();

  }

  selectRoom(room) {
    this.setState({ roomId: room.key });
  }

  setUser(user) {
    this.setState({ user: user });
    if (this.state.user !== null){
      console.log(user.displayName);
    }
  }


  handleSignIn() {
    const provider = new x.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        this.setUser(result.user);
      })
      .catch(function(error) {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

  }

  handleSignOut() {
    const provider = new x.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {});
  }


  render() {
    var currentUser = null;

    if (this.state.user !== null){
      currentUser = this.state.user.displayName
    } else {
      currentUser = "Guest"
    }


    return (
      <div>
        <User setUser={this.setUser.bind(this)}
         signIn={this.handleSignIn.bind(this)}
         signOut={this.handleSignOut.bind(this)}
         displayUser={currentUser}
        />
        <RoomList handleClick={this.selectRoom.bind(this)} />
        <MessageList roomId={this.state.roomId} />
      </div>
    );
  }
}

export default App;
