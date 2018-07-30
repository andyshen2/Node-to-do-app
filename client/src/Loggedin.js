import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Loggedin extends Component {

  state = {
      fields: {},
  };



  Submit = fields => {
    this.setState({fields});
  };

  render() {
    return (
      <div className="App">
        <h1>Logged in</h1>
      </div>
    );
  }
}

export default Loggedin;
