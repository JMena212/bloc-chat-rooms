import React, { Component } from "react";
import x from "firebase";
import ".././styles/chat.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
    this.userRef = new x.auth.GoogleAuthProvider();
  }

  componentDidMount() {
    x.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  render() {



    return (
      <div>
      <button onClick={() => this.props.signIn()}> Sign In </button>

      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to sign out?"))
            this.props.signOut();
        }}
      >
        {" "}
        Sign Out{" "}
      </button>
      <h2> Welcome, {this.props.displayUser}</h2>
      </div>
    );
  }
}

export default User;
