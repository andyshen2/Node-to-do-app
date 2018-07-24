import React from 'react';

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  state = {
    email: '',
    password:'',
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.callApi()
    //   .then(res => this.setState({fields: res.express}))
    //   .catch(err => console.log(err));

  fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {

          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "email": this.state.email,//"andy@example.com",
            "password": this.state.password
        })

  }).then((res) => res.json())
    .then(json => {
      alert('user has been made');
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
    return (

      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
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
