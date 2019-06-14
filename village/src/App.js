import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => console.log(err));
  }

  postSmurf = item => {
    axios
      .post("http://localhost:3333/smurfs", item)
      .then(res => {
        console.log(res);
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="nav-links">
          <NavLink exact to="/">
            List of Smurfs
          </NavLink>
          <NavLink to="/smurf-form">Smurf Form</NavLink>
        </div>
        <Route
          exact
          path="/"
          render={props => <Smurfs {...props} smurfs={this.state.smurfs} />}
        />

        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} postSmurf={this.postSmurf} />}
        />
      </div>
    );
  }
}

export default App;
