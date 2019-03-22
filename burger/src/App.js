import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";

const AsyncCheckout = React.lazy(() =>
  import("./containers/Checkout/Checkout")
);
const AsyncOrdersPromise = import("./containers/Orders/Orders")
const AsyncOrders = React.lazy(() => AsyncOrdersPromise);
const AsyncAuthPromise = import("./containers/Auth/Auth");
const AsyncAuth = React.lazy(() => AsyncAuthPromise);

const App = (props) => {
  useEffect(() => { props.onTryAutoSignup() }, []);

  const routes = [
    <Route key="home" path="/" exact component={BurgerBuilder} />,
    <Route key="logout" path="/logout" component={Logout} />,
    <Route key="error" path="/error" render={() => <h1>Not Found!</h1>} />,
    <Route
      key="auth"
      path="/auth"
      render={() => ( <AsyncAuth /> )}
    />,
    <Redirect key="redirect" from="/**" to="/error" />
  ];

  props.isAuthenticated && routes.unshift(
    <Route
      key="checkout"
      path="/checkout"
      render={() => ( <AsyncCheckout /> )}
    />,
    <Route
      key="orders"
      path="/orders"
      render={() => ( <AsyncOrders /> )}
    />
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>{routes}</Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
