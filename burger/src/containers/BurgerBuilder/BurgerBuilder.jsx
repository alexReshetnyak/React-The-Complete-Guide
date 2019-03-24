import React, { useState, useEffect } from "react";
// import queryString from "query-string";
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import axios from '../../axios-orders';

import Aux from "../../hoc/wrapper/Wrapper";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const BurgerBuilder = props => {
  const {
    ings: ingredients, 
    price: totalPrice, 
    error, 
    isAuthenticated, 
    loading 
  } = props;

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();    
  }, []);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    props.isAuthenticated ?
      setPurchasing(true) :
      props.onSetAuthRedirectPath('/checkout') &&
      props.history.push('/auth');
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('./checkout');
  };

  const getDisabledInfo = () => {
    const disabledInfo = { ...props.ings };

    Object.keys(disabledInfo || {}).forEach(key => {
      disabledInfo[key] = !disabledInfo[key];
    });

    return disabledInfo;
  };

  const getOrderSummary = () => {
    return ingredients ? (
      <OrderSummary
        ingredients={ingredients || {}}
        price={totalPrice}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    ) : null;
  };

  const getBurger = () => {
    let burger = error ? <p>Ingredients load failed :(</p> : null;

    ingredients && (burger = (
      <>
        <Burger ingredients={ingredients} />
        <BuildControls
          price={totalPrice}
          ingredientAdd={props.onIngredientAdded}
          ingredientRemove={props.onIngredientRemoved}
          disabled={getDisabledInfo()}
          isAuth={isAuthenticated}
          purchasable={updatePurchaseState(ingredients)}
          handlePurchase={purchaseHandler}
        />
      </>
    ));

    return burger;
  };
  

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {getOrderSummary()}
      </Modal>
      { loading ? <Spinner /> : getBurger()}
    </Aux>
  );
};

const mapStateToProps = state => {
  const { burgerBuilder, auth } = state;
  return {
    ings: burgerBuilder.ingredients,
    price: burgerBuilder.totalPrice,
    error: burgerBuilder.error,
    loading: burgerBuilder.loading,
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
