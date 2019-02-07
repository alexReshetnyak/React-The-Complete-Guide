import React, { Component } from "react";
// import queryString from "query-string";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";


class Checkout extends Component {

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { ings: ingredients } = this.props;

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
          component={ContactData}/>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
};

export default connect(mapStateToProps)(Checkout);
