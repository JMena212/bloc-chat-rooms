import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import '.././styles/chat.css'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.messagesRef = firebase.database().ref("messages");
  }

  handleSignIn(event) {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then(function(result) {
      var token = result.credential.accessToken;
      var user  = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
    })
    });
  }

  handleSignOut(event) {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signOut();
  }


  render() {
    const signIn = "Sign In"
    const signOut = "Sign Out"


    return (
      <div>
      <span onClick={ () => this.handleSignIn(signIn)}> Sign In </span>
      <span onClick={ () => this.handleSignOut(signOut)}> Sign Out </span>
      </div>
    );
  }
}

export default User;
