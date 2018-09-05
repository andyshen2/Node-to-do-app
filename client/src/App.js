import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Register from './Resgister.js';
import Loggedin from './Loggedin.js';
import Login from './login';
import Edit from './showtodo.js';
class App extends Component {


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>

            <Route exact path="/Register" component={Register}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/loggedin" component={Loggedin}/>
            <Route exact path="/Edit" component={Edit}/>

          </div>
        </BrowserRouter>



      </div>
    );
  }
}

export default App;
