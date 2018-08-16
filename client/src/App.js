import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Register from './Resgister.js';
import Loggedin from './Loggedin.js';
class App extends Component {


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>

            <Route exact path="/Register" component={Register}/>
            <Route exact path="/loggedin" component={Loggedin}/>
          </div>
        </BrowserRouter>
      


      </div>
    );
  }
}

export default App;
