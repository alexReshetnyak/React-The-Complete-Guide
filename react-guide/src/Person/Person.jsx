import React from "react";
import './Person.scss';

const person = props => {
  return (
    <div className='Person'>
      <h1 onClick={props.handleDelete}>
        Hi I'm a {props.name} and I'm {props.age} years old!
      </h1>
      <p>{props.children}</p>
      <input type="text" onChange={props.handleChange} value={props.name} />
    </div>
  );
};

export default person;
