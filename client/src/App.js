import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Register from "./Resgister.js";
import Loggedin from "./Loggedin.js";
import Login from "./login";
import Edit from "./showtodo.js";

const token = localStorage.getItem("token");
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/loggedin" component={Loggedin} />
              <PrivateRoute path="/Edit" component={Edit} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
