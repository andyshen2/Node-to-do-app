import React from 'react';
import { BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
//import Loggedin from './Loggedin.js';
//import Loggedin from './Loggedin.js';

export default class Edit extends React.Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
  state = {
    todo: '',
    allTodos: '',
    loading: true

  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
              'x-auth' : localStorage.getItem("token"),
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "text": this.state.todo,
            })

      }).then((res) =>{


        })
        .catch(err => console.log(err.message));

  }


change = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
};
componentDidMount() {
  this.getTodos();
}
getTodos() {
    fetch('http://localhost:3000/todos/get', {
      method: 'GET',
      headers: {
        'x-auth' : localStorage.getItem("token"),
        'Content-Type':'application/json'
      }})
      .then((res) =>{
        if(res.ok){
          res.json().then(json => {
              //console.log(json);
            //  this.setState('allTodos': json, 'loading': false);
              this.setState({
               allTodos: json,
               loading: false
             });
              console.log(this.state.allTodos);
          });
        }
      })
      .catch(err => console.log(err.message));
}
help(){

    console.log(this.state.allTodos);
}
Submit = (e) => {
  e.preventDefault();
  this.props.onSubmit(this.state);


};
render () {
      let content;
      if (this.state.loading === false) {
        content = Object.keys(this.state.allTodos.todos).map(key => {
         console.log(this.state.allTodos.todos[key])
         return <div key={key}> To do: {this.state.allTodos.todos[key].text}</div>;
        })
      } else {
        content = ''; // whatever you want it to be while waiting for data
      }
      return (


  <form onSubmit={this.handleSubmit}>

      New todo
      <input
        type="text"
        name="todo"
        value={this.state.todo}
        onChange={this.change} />


        <button type="Submit">
          Add
        </button>

        <div>
          {content}
        </div>
      </form>

      )
    }
}
