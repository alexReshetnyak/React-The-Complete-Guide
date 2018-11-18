import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/error" render={() => <h1>Not Found!</h1>} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect from="/**" to="/error"/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
