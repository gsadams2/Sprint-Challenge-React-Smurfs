import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import UpdateForm from "./components/UpdateForm";
import axios from "axios";

const NavYo = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid red;
  display: flex;
  justify-content: space-around;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      activeSmurf: null
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

  setUpdateForm = smurf => {
    this.setState({
      activeSmurf: smurf
    });
  };

  updateSmurf = (id, updatedInfo) => {
    axios
      .put(`http://localhost:3333/smurfs/${id}`, updatedInfo)
      .then(res => {
        this.setState({ smurfs: res.data });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        this.setState({ smurfs: res.data });
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <NavYo>
          <NavLink exact to="/">
            List of Smurfs
          </NavLink>
          <NavLink to="/smurf-form">Smurf Form</NavLink>
        </NavYo>
        <Route
          exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
              setUpdateForm={this.setUpdateForm}
            />
          )}
        />

        <Route
          path="/smurf-form"
          render={props => <SmurfForm {...props} postSmurf={this.postSmurf} />}
        />
        <Route
          path="/update-form"
          render={props => (
            <UpdateForm
              {...props}
              updateSmurf={this.updateSmurf}
              activeSmurf={this.state.activeSmurf}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
