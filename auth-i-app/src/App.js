import React, { Component } from 'react';
import axios from 'axios';

// import Login from "./Components/Login/Login";
// import Register from "./Components/Register/Register";
import UserList from "./Components/UserList/UserList"

import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      users: [],
      loggedIn: false,
		};
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios
			.get("http://localhost:5000/api/restricted/users")
			.then(res => {
				console.log("Server Response :", res);
				this.setState({ users: res.data });
			})
			.catch(err => {
				console.log("Server Error: ", err);
			});
  }
  

  render() {
    if(this.state.loggedIn === true) {
      return (
        <div className="App">
          <UserList users={this.state.users}/>
        </div>
      );
    } else {
      return (
        <div className="not-authorized">
          <h2>401</h2>
          <h3>Sorry, you aren't authorized to view this content.</h3>
        </div>
      )
    }
  }
}

export default App;
