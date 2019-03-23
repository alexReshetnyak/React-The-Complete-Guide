import React from "react";
// import queryString from "query-string";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";


const Checkout = props => {
  const { ings: ingredients, purchased } = props;
  let summary = <Redirect  to='/'/>;

  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };


  ingredients && !purchased && ( summary = (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCanceled={checkoutCanceledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}/>
    </div>
  ));

  return summary;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
};

// export default withRouter(
//   connect(mapStateToProps)(Checkout)
// );

export default connect(mapStateToProps)(Checkout);