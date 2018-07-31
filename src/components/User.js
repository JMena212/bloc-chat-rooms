import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import x from "firebase";
import ".././styles/chat.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {user: ""};
    this.userRef = new x.auth.GoogleAuthProvider()
  }

  handleSignIn() {
    console.log(new x.auth.GoogleAuthProvider());

    const provider = new x.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        this.props.setUser(user);
        return result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

  }

  handleSignOut() {
    const provider = new x.firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {});
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {
    const signIn = "Sign In";
    const signOut = "Sign Out";


    return (
      <div>
        <span onClick={() => this.handleSignIn(signIn)}> Sign In </span>
        <span onClick={() => this.handleSignOut(signOut)}> Sign Out </span>
      </div>
    );
  }
}

export default User;
