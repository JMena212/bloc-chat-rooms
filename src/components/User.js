import React, { Component } from "react";
import firebase from "../lib/firebase.js";
import x from "firebase";
import ".././styles/chat.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
    this.userRef = new x.auth.GoogleAuthProvider();
    const provider = new x.auth.GoogleAuthProvider();
  }

  handleSignIn() {
    /*console.log(new x.auth.GoogleAuthProvider());*/
    const provider = new x.auth.GoogleAuthProvider();
    var user = firebase.auth().currentUser;
    console.log(firebase.auth().currentUser)
    var name, email, photoUrl, uid, emailVerified;

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        this.props.setUser(result.user);
        window.localStorage.setItem("user", "user");
      })
      .catch(function(error) {
        window.localStorage.setItem("error", error)
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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {
    const signIn = "Sign In";
    const signOut = "Sign Out";
    window.localStorage.setItem("error", "error")

    return (
      <div>
        <span onClick={() => this.handleSignIn(signIn)}> Sign In </span>
        <span
          onClick={() => {
            if (window.confirm("Are you sure you want to sign out?"))
              this.handleSignOut(signOut);
          }}
        >
          {" "}
          Sign Out{" "}
        </span>
      </div>
    );
  }
}

export default User;
