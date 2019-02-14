
import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from "./Auth.css";
import { Input } from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';

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
    },
    isSignup: true
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

  submitHandler = (event) => {
    const { email, password } = this.state.controls;
    event.preventDefault();

    this.props.onAuth(email.value, password.value, this.state.isSignup);
  }

  switchAuthModeHandler =() => {
    this.setState(({ isSignup }) => ({
      isSignup: !isSignup
    }));
  }

  render() {
    const { controls, isSignup } = this.state;
    const { loading, error } = this.props;

    const formElementsArray = Object.keys(controls).map(key => 
      ({ key, config: controls[key] })
    );

    const spinner = <Spinner />;
    const errorMessage = error ? <p>{error.message}</p> : null;

    const form = (
      <form onSubmit={this.submitHandler}>
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
        {errorMessage}
        {loading ? spinner : form}
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO { isSignup ? 'SIGNIN' : 'SIGNUP' }
        </Button>
      </div>
    );
  };
}
 
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);