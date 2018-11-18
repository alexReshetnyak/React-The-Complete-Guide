import React, { Component } from "react";
import queryString from "query-string";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null
  };

  componentDidMount = () => {
    const {
      location: { search: query }
    } = this.props;

    this.setState({
      ingredients: queryString.parse(query)
    });
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { ingredients } = this.state;

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
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
