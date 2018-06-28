import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList'

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
      <div>
      <RoomList firebase={firebase}/>
      <MessageList firebase={firebase}/>
      </div>

    );
  }
}

export default App;
