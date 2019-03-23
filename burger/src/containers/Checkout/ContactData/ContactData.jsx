import React, { useState } from "react";
import { connect } from "react-redux";

import { updateObject, checkValidity } from "../../../shared/utility";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import { Input } from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import { orderFormConfig } from "./ContactDataFormConfig";

const ContactData = props => {
  const [orderForm, setOrderForm] = useState(orderFormConfig);
  const [formInvalid, setFormInvalid] = useState(true);

  const getElementsArray = () => {
    return Object.keys(orderForm).map(key => ({
      key,
      config: orderForm[key]
    }));
  };

  const orderHandler = event => {
    event.preventDefault();

    const formData = Object.keys(orderForm).reduce((sum, key) => {
      sum[key] = orderForm[key].value;
      return sum;
    }, {});

    const order = {
      ingredients: props.ings,
      price: props.price.toFixed(2),
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    const formInvalid = Object.keys(updatedOrderForm).some(key => {
      return !updatedOrderForm[key].valid;
    });

    setOrderForm(updatedOrderForm);
    setFormInvalid(formInvalid);
  };

  const getForm = () => {
    if (props.loading) {
      return <Spinner />;
    }

    return (
      <form onSubmit={orderHandler}>
        {getElementsArray().map(element => (
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
        <Button btnType="Success" disabled={formInvalid}>
          ORDER
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {getForm()}
    </div>
  );
}

const mapStateToProps = state => {
  const { burgerBuilder, order, auth } = state;

  return {
    ings: burgerBuilder.ingredients,
    price: burgerBuilder.totalPrice,
    loading: order.loading,
    token: auth.token,
    userId: auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   withRouter(withErrorHandler(ContactData, axios)) // * with router data in props (location obj)
// );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(ContactData, axios) // * with router data in props (location obj)
);
