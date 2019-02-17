import React, { Component } from "react";
// import queryString from "query-string";
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import axios from '../../axios-orders';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
// import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.props.isAuthenticated ?
      this.setState({ purchasing: true }) :
      this.props.onSetAuthRedirectPath('/checkout') &&
      this.props.history.push('/auth');
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('./checkout');
  }

  render() {
    const disabledInfo = { ...this.props.ings };
    const { ings: ingredients, price: totalPrice, error, isAuthenticated } = this.props;
    const { purchasing } = this.state;

    Object.keys(disabledInfo || {}).forEach(key => {
      disabledInfo[key] = !disabledInfo[key];
    });

    let orderSummary = null;
    let burger = error ? <p>Ingredients load failed :(</p> : null;

    ingredients && (orderSummary = (
      <OrderSummary
        ingredients={ingredients || {}}
        price={totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    ));
    
    ingredients && (burger = (
      <>
        { /*<React.Fragment> */}
        <Burger ingredients={ingredients} />
        <BuildControls
          price={totalPrice}
          ingredientAdd={this.props.onIngredientAdded}
          ingredientRemove={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          isAuth={isAuthenticated}
          purchasable={this.updatePurchaseState(ingredients)}
          handlePurchase={this.purchaseHandler}
        />
      {/* </React.Fragment> */}
      </>
    ));

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
};

const mapStateToProps = state => {
  const { burgerBuilder, auth } = state;
  return {
    ings: burgerBuilder.ingredients,
    price: burgerBuilder.totalPrice,
    error: burgerBuilder.error,
    isAuthenticated: !!auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(
      actions.addIngredient(ingredientName)
    ),
    onIngredientRemoved: (ingredientName) => dispatch(
      actions.removeIngredient(ingredientName)
    ),
    onInitIngredients: () => dispatch(
      actions.initIngredients()
    ),
    onInitPurchase: () => dispatch(
      actions.purchaseInit()
    ),
    onSetAuthRedirectPath: (path) => dispatch(
      actions.setAuthRedirectPath(path)
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
