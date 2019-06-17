import React from "react";

const Smurf = props => {
  const deleteSmurf = e => {
    e.preventDefault();
    props.deleteSmurf(props.id);
  };

  const setUpdateForm = e => {
    e.preventDefault();
    props.setUpdateForm(props.smurf);
    props.history.push("/update-form");
  };

  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <button onClick={deleteSmurf}>Delete Smurf</button>
      <button onClick={setUpdateForm}>Edit Smurf</button>
    </div>
  );
};

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
