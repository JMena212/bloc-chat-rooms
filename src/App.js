import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import ActiveRoom from './components/ActiveRoom'


class App extends Component {
  render() {

    return (
      <div>
      <Route exact path="/" component={RoomList} />
      <Route path="/rooms/:id" component={ActiveRoom}/>
      </div>

    );
  }
}

export default App;
