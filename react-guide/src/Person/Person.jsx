import React from "react";

const person = props => {
  return (
    <div>
      <h1>
        Hi I'm a {props.name} and I'm {props.age} years old!
      </h1>
      <p>{props.children}</p>
      <input type="text" value={props.name} onChange={props.handleChange} />
    </div>
  );
};

export default person;
