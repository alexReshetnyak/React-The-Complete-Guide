import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  }
  
  orderHandler = async (event) => {
    event.preventDefault();

    await this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.address.street,
          postalCode: this.state.address.postalCode,
        }
      }
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

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
