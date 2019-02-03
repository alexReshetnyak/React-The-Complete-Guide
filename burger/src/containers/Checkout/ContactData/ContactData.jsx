import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import { Input } from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";

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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  }
  
  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = Object.keys(this.state.orderForm).reduce((sum, key) => {
      sum[key] = this.state.orderForm[key].value;
      return sum;
    }, {});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    try {
      await axios.post('/orders.json', order);
      this.setState({ loading: false });
      // console.log('Response:', res);
      this.props.history.push('/');
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  checkValidity(value, rules) {
    let isValid = true;

    rules.required && isValid && (isValid = value.trim() !== '');
    rules.minLength && isValid && (isValid = value.length >= rules.minLength);
    rules.maxLength && isValid && (isValid = value.length <= rules.maxLength);

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier]};
    
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation 
    )

    console.log(updatedFormElement);
    
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm });
  }

  render() {
    const { orderForm } = this.state;
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
            changed={(event) => this.inputChangedHandler(event, element.key)}
          />
        ))}
        <Button btnType="Success">ORDER</Button>
      </form>
    );

    this.state.loading && (form = <Spinner />);

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
