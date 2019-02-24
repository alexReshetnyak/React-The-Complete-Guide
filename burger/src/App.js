import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";

const AsyncCheckout = React.lazy(() =>
  import("./containers/Checkout/Checkout")
);
const AsyncOrders = React.lazy(() => import("./containers/Orders/Orders"));
const AsyncAuth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  };

  render() {
    const routes = [
      <Route
        key="auth"
        path="/auth"
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncAuth />
          </Suspense>
        )}
      />,
      <Route key="logout" path="/logout" component={Logout} />,
      <Route key="error" path="/error" render={() => <h1>Not Found!</h1>} />,
      <Route key="home" path="/" exact component={BurgerBuilder} />,
      <Redirect key="redirect" from="/**" to="/error" />
    ];

    this.props.isAuthenticated &&
      routes.unshift(
        <Route
          key="checkout"
          path="/checkout"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <AsyncCheckout />
            </Suspense>
          )}
        />,
        <Route
          key="orders"
          path="/orders"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <AsyncOrders />
            </Suspense>
          )}
        />
      );

    return (
      <div>
        <Layout>
          <Switch>{routes}</Switch>
        </Layout>
      </div>
    );
  }
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
