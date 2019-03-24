import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";
import { Input } from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions";
import { updateObject, checkValidity } from "../../shared/utility";
import { authFormConfig } from "./AuthFormConfig";

const Auth = props => {
  const [controls, setControls] = useState(authFormConfig);
  const [isSignup, setIsSignup] = useState(true);

  const { loading, error, isAuthenticated, authRedirectPath } = props;
  const spinner = <Spinner />;
  const errorMessage = error ? <p>{error.message}</p> : null;
  const authRedirect = <Redirect to={authRedirectPath} />;

  useEffect(() => {
    const {
      buildingBurger,
      authRedirectPath,
      onSetAuthRedirectPath
    } = props;

    !buildingBurger && authRedirectPath !== "/" && onSetAuthRedirectPath();
  }, []);


  const inputChangedHandler = (event, controlName) => {
    const { value } = event.target;

    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value,
        valid: checkValidity(value, controls[controlName].validation),
        touched: true
      })
    });

    setControls(updatedControls);
  };

  const submitHandler = event => {
    const { email, password } = controls;
    event.preventDefault();

    props.onAuth(email.value, password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const getFormElementArray = () => {
    const formElementsArray = Object.keys(controls).map(key => ({
      key,
      config: controls[key]
    }));

    return formElementsArray;
  };

  const getForm = () => {
    return (
      <form onSubmit={submitHandler}>
        {getFormElementArray().map(element => (
          <Input
            key={element.key}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            changed={event => inputChangedHandler(event, element.key)}
          />
        ))}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    );
  };

  return (
    <div className={classes.Auth}>
      {isAuthenticated ? authRedirect : null}

      {errorMessage}

      {loading ? spinner : getForm()}
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};



const mapStateToProps = state => {
  const { auth, burgerBuilder } = state;

  return {
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: !!auth.token,
    buildingBurger: burgerBuilder.building,
    authRedirectPath: auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
