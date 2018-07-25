import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Resgister.js';

class App extends Component {

  state = {
      fields: {},
  };



  Submit = fields => {
    this.setState({fields});
  };

  render() {
    return (
      <div className="App">
        <Register onSubmit={fields => this.Submit(fields)}/>

        <p>{JSON.stringify(this.state.fields, null, 2)}</p>
      </div>
    );
  }
}

export default App;
