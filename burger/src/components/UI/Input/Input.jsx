import React from 'react';

import classes from './Input.css';

const Input = (props) => {
  const { elementType, label, elementConfig, value, changed } = props;
  let inputElement = null;

  switch  (elementType) {
    case 'input':
      inputElement = <input 
        className={classes.InputElement} 
        onChange={changed}
        { ...elementConfig} 
        value={value}/>
      break;

    case 'textarea':
      inputElement = <textarea 
        className={classes.InputElement} 
        onChange={changed}
        { ...elementConfig} 
        value={value}/>
      break;

    case 'select':
      inputElement = (
        <select className={classes.InputElement} value={value} onChange={changed}>
          {elementConfig.options.map((option, index) => (
            <option key={index} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );

      break;
  
    default:
      inputElement = <input 
        className={classes.InputElement} 
        onChange={changed}
        { ...elementConfig} 
        value={value}/>
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
}
 
export { Input };
