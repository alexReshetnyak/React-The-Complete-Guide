import React, { Component } from "react";
import queryString from "query-string";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";


class Checkout extends Component {
  state = {
    ingredients: null,
    price: null
  };

  componentWillMount = () => {
    const {
      location: { search: query }
    } = this.props;

    const { price, ...ingredients } = queryString.parse(query);

    // console.log('CheckOut ComponentDidMount price + ingredients', price, ingredients);
    
    this.setState({ ingredients, price });
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { ingredients, price } = this.state;

    return (
      <div>
        {ingredients && (
          <CheckoutSummary
            ingredients={ingredients}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
        )}
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => <ContactData price={price} ingredients={ingredients}/>}
        />
      </div>
    );
  }
}

export default Checkout;
