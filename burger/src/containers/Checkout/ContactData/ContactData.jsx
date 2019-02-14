import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import { Input } from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: "Your name"
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: "Your Email"
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: "Street"
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: "Postal Code"
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: "Country"
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formInvalid: true
  };
  
  orderHandler = (event) => {
    event.preventDefault();

    const formData = Object.keys(this.state.orderForm).reduce((sum, key) => {
      sum[key] = this.state.orderForm[key].value;
      return sum;
    }, {});

    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier]};
    
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation 
    );
    updatedFormElement.touched = true;
    
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    const formInvalid = Object.keys(updatedOrderForm).some(key => {
      return !updatedOrderForm[key].valid;
    });

    this.setState({ orderForm: updatedOrderForm, formInvalid });
  };

  render() {
    const { orderForm, formInvalid } = this.state;
    const formElementsArray = Object.keys(orderForm).map(key => 
      ({ key, config: orderForm[key] })
    );

    let form = (
      <form onSubmit={this.orderHandler}>
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
        <Button btnType="Success" disabled={formInvalid}>ORDER</Button>
      </form>
    );

    this.props.loading && (form = <Spinner />);

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { burgerBuilder, order, auth } = state;

  return {
    ings: burgerBuilder.ingredients,
    price: burgerBuilder.totalPrice,
    loading: order.loading,
    token: auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(
    withErrorHandler(ContactData, axios)
  ) // * with router data in props (location obj)
);
