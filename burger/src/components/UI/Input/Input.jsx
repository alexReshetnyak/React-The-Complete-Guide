import React from 'react';

import classes from './Input.css';

const input = (props) => {
  const { inputType, label } = props;
  let inputElement = null;

  switch (inputType) {
    case 'input':
      inputElement = <input className={classes.inputElement} {...props}/>    
      break;

    case 'textarea':
      inputElement = <textarea className={classes.inputElement} { ...props }/>
      break;
  
    default:
      inputElement = <input className={classes.inputElement} {...props}/>
      break;
  }

  return (
    <div className={classes.Input}>
      <label>{label}</label>
      {inputElement}
    </div>
  );
}
 
export default input;