import React from "react";
import Radium from "radium";
import './Person.scss';

const person = props => {
  const style = {
    '@media (min-width: 1200px)': {
      width: '450px'
    }
  }

  // const rnd = Math.random();
  // console.log('RND:', rnd);
  
  // if (rnd > 0.98) {
  //   throw new Error('Something fail in Person Component');
  // }

  return (
    <div className='Person' style={style}>
      <h1 onClick={props.handleDelete}>
        Hi I'm a {props.name} and I'm {props.age} years old!
      </h1>
      <p>{props.children}</p>
      <input type="text" onChange={props.handleChange} value={props.name} />
    </div>
  );
};

export default Radium(person);
