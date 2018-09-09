import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter,
  observer
} from "react-router-dom";
import Route from "react-router-dom/Route";
import Loggedin from "./Loggedin.js";
//import Loggedin from './Loggedin.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    //   localStorage.setItem("loggedIn", "false");
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    email: "",
    password: "",
    loggedIn: false
  };

  handleSubmit(e) {
    e.preventDefault();

    fetch("https://whispering-journey-50918.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(json => {
            console.log(json);
            localStorage.setItem("user_id", json._id);
            console.log(localStorage.getItem("user_id"));
          });
          localStorage.setItem("token", res.headers.get("x-auth"));
          //alert("token is " + localStorage.getItem("token"));

          localStorage.setItem("loggedIn", true);
          console.log("ripme " + localStorage.getItem("loggedIn"));
          //  this.loggedIn = localStorage.getItem("loggedin");
          this.setState({ loggedIn: true });
          //  alert(res.headers.get("x-auth"))
        }
      })
      .then(json => {})
      .catch(err => console.log(err.message));
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  Submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  componentDidMount() {
    //  localStorage.getItem('loggedIn') && this.setState({loggedIn : localStorage.getItem('loggedIn')});
  }
  render() {
    if (this.state.loggedIn === true) {
      return (
        <Router>
          return <Redirect to="/Edit" />
        </Router>
      );
    }
    //  const { loggedIn } = this.state.loggedIn;
    //  if(this.state.loggedIn){
    //    console.log("hi" + localStorage.getItem("loggedIn"));
    // <Router>
    //    return <Redirect to="/loggedin"/>
    //  </Router>

    //alert("you are logged in");
    //  }
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <input
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.change}
        />

        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          valid={this.state.password}
          onChange={this.change}
        />
        <br />
        <button type="Submit">Submit</button>
      </form>
    );
  }
}

export default Login;
