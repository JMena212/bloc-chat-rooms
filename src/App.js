import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';


import RoomList from './components/RoomList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDCqoibibgw-BzBSurWmYJuRpgXWUByeLY",
    authDomain: "bloc-chat-rooms-mena.firebaseapp.com",
    databaseURL: "https://bloc-chat-rooms-mena.firebaseio.com",
    projectId: "bloc-chat-rooms-mena",
    storageBucket: "bloc-chat-rooms-mena.appspot.com",
    messagingSenderId: "391599309588"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
