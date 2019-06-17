import React, { Component } from "react";

export class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button
            onClick={() =>
              this.props.updateSmurf(this.props.activeSmurf.id, this.state)
            }
            type="submit"
          >
            Update Smurf
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateForm;
