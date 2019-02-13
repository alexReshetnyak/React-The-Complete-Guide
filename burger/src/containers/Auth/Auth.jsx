
import React, { Component } from 'react';

import classes from "./Auth.css";
import { Input } from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: "Your email"
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: "Password"
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) { return isValid; }

    rules.required && isValid && (isValid = value.trim() !== '');
    rules.minLength && isValid && (isValid = value.length >= rules.minLength);
    rules.maxLength && isValid && (isValid = value.length <= rules.maxLength);

    if (rules.isEmail && isValid) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric && isValid) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const { value } = event.target;
    const { controls } = this.state;

    const updatedControls = { 
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value,
        valid: this.checkValidity(value, controls[controlName].validation),
        touched: true
      } 
    };

    this.setState({ controls: updatedControls });
  };

  render() {
    const { controls } = this.state;
    const formElementsArray = Object.keys(controls).map(key => 
      ({ key, config: controls[key] })
    );


    const form = (
      <form>
        {formElementsArray.map(element => (
          <Input
            key={element.key}
            elementType={element.config.elementType} 
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={(event) => this.inputChangedHandler(event, element.key)}
          />
        ))}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    );

    return (
      <div className={classes.Auth}>
        {form}
      </div>
    );
  };
}
 
export default Auth;