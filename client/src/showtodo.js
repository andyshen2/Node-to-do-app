import React from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import Route from "react-router-dom/Route";
import Login from "./login.js";
import "./todo.css";
//import Loggedin from './Loggedin.js';

class TextField extends React.Component {
  render() {
    var text = this.props.text;
    return (
      <td>
        <div>{text}</div>
      </td>
    );
  }
}

class TextInput extends React.Component {
  render() {
    const { value, onChange, name } = this.props;
    return (
      <td>
        <input type="text" value={value} onChange={onChange} name={name} />
      </td>
    );
  }
}
class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Editing: false,
      deleted: false,
      text: this.props.data.text
    };
    this.toggleEditing = this.toggleEditing.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deletedChange = this.deletedChange.bind(this);
  }

  toggleEditing() {
    console.log("toggle");
    let Editing = !this.state.Editing;
    this.setState({
      Editing: Editing
    });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  saveChanges() {
    const { text } = this.state;
    this.toggleEditing();
    fetch("http://localhost:3000/todos/" + this.props.data._id, {
      method: "PATCH",
      headers: {
        "x-auth": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text
      })
    })
      .then(res => {})
      .catch(err => console.log(err.message));
  }
  /*saveChanges() {
    const { text } = this.state;
    this.toggleEditing();
    this.props.saveChanges({
      key: this.props.data.text,
      text
    });
  }*/
  deletedChange() {
    this.setState({
      deleted: true
    });
    fetch("http://localhost:3000/todos/" + this.props.data._id, {
      method: "DELETE",
      headers: {
        "x-auth": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(res => {})
      .catch(err => console.log(err.message));
  }
  render() {
    console.log(this.props.data);
    const data = this.props.data;
    let Editing = this.state.Editing;
    let Deleted = this.state.deleted;
    if (!Deleted) {
      if (Editing) {
        return (
          <tr>
            <TextInput
              value={this.state.text}
              name="text"
              onChange={this.onChange}
            />

            <td>
              <button onClick={this.saveChanges}>Save</button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr>
            <TextField text={this.state.text} />

            <td>
              <button onClick={this.toggleEditing}>Edit</button>
              <button onClick={this.deletedChange}>Delete</button>
            </td>
          </tr>
        );
      }
    } else {
      return null;
    }
  }
}
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //UsersData: UsersData
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges({ key, text }) {
    this.setState(prevState => ({
      UsersData: prevState.UsersData.map(data => {
        if (data._id === key) return { text: text };
        return data;
      })
    }));
  }
  handleFieldChange(fieldId, value) {
    this.setState({ [fieldId]: value });
  }

  render() {
    let rows;
    let thing = [];

    if (this.props.hi !== undefined) {
      rows = Object.keys(this.props.hi).map(key => {
        return (
          <TableRow
            key={this.props.hi[key]._id}
            //saveChanges={this.saveChanges}
            data={this.props.hi[key]}
          />
        );
        //  return <div>{this.props.hi[key].text}</div>
      });
    } else {
      //fields = "";
    }
    return <div>{rows}</div>;
  }
}

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.logout = this.logout.bind(this);
  }
  state = {
    todo: "",
    allTodos: "",
    loading: true,
    loggedIn: true
  };

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "x-auth": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.todo
      })
    })
      .then(res => {})
      .catch(err => console.log(err.message));
    this.getTodos();
    this.forceUpdate();
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
    fetch("http://localhost:3000/todos/get", {
      method: "GET",
      headers: {
        "x-auth": localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          res.json().then(json => {
            //console.log(json);
            //  this.setState('allTodos': json, 'loading': false);
            this.setState({
              allTodos: json,
              loading: false
            });
            UsersData = json;

            if (localStorage.getItem("loggedIn") === "false") {
              console.log("ayyyyy");
            }
          });
        }
      })
      .catch(err => console.log(err.message));
  }
  logout() {
    //  console.log();
    localStorage.removeItem("token");
    this.setState({ loggedIn: false });
  }
  Submit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/login" />;
    }
    let Editing = this.state.Editing;
    let content;

    /*if (this.state.loading === false) {
      content = Object.keys(this.state.allTodos.todos).map(key => {
        // console.log(this.state.allTodos.todos[key])
        if (Editing) {
          return (
            <div key={key}>
              To do: {this.state.allTodos.todos[key].text} <button>edit</button>
            </div>
          );
        } else {
          return (
            <div key={key}>
              To do: {this.state.allTodos.todos[key].text} <button>edit</button>
            </div>
          );
        }
      });
    } else {
      content = "";
    }*/
    return (
      <div className="todo">
        <button onClick={this.logout}>logout</button>

        <form onSubmit={this.handleSubmit}>
          New todo
          <input
            type="text"
            name="todo"
            value={this.state.todo}
            onChange={this.change}
          />
          <button type="Submit">Add</button>
        </form>

        <div>
          {" "}
          <Table hi={this.state.allTodos.todos} />{" "}
        </div>
      </div>
    );
  }
}

let UsersData = [];
