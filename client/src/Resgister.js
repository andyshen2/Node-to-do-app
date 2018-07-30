import React from 'react';
import { BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Loggedin from './Loggedin.js';

export default class Resgister extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  state = {
    email: '',
    password:'',
    loggedIn: false,
  }

  handleSubmit(e) {
    e.preventDefault();

  fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {

          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "email": this.state.email,
            "password": this.state.password
        })

  }).then((res) =>{
      if(res.ok){
        localStorage.setItem("token", res.headers.get("x-auth"));
        //alert("token is " + localStorage.getItem("token"));
        this.setState({loggedIn: true})
      //  alert(res.headers.get("x-auth"))
      }

    })
    .then(json => {
      alert(json.headers);
    })
    .catch(err => console.log(err.message));
};


change = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
};

Submit = (e) => {
  e.preventDefault();
  this.props.onSubmit(this.state);

};
  render() {
    if(this.state.loggedIn === true){
    <Router>
       <Redirect to='/loggedIn' component={Loggedin}/>
    </Router>
      //alert("you are logged in");
    }
    return (

      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        <input
          name="email"
          placeholder='Email'
          value={this.state.email}
          onChange={this.change} />

          <br/>
          <input
            name="password"
            type='password'
            placeholder="Password"
            valid={this.state.password}
            onChange={this.change}/>
            <br/>
        <button type="Submit">
          Submit
        </button>
      </form>
    );
  }
}
