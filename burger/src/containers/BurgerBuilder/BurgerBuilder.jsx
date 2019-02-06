import React, { Component } from "react";
import queryString from "query-string";
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import axios from "../../axios-orders";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  async componentDidMount() {
    // this.setState({ loading: true });

    // try {
    //   const { data: ingredients } = await axios.get("/ingredients.json");
    //   this.setState({ ingredients, loading: false });
    // } catch (error) {
    //   this.setState({ error: true, loading: false });
    // }
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: !!sum });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
      search: queryString.stringify(Object.assign(
        {}, 
        this.state.ingredients, 
        { price: this.state.totalPrice.toFixed(2) }
      ))
    });
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    const { ings: ingredients, price: totalPrice } = this.props;
    const {
      purchasable,
      purchasing,
      loading,
      error
    } = this.state;

    Object.keys(disabledInfo || {}).forEach(key => {
      disabledInfo[key] = !disabledInfo[key];
    });

    let orderSummary = null;
    let burger = error ? <p>Ingredients load failed :(</p> : null;

    loading && (orderSummary = <Spinner />);
    loading && !ingredients && (burger = <Spinner />);

    !loading && ingredients && (orderSummary = (
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
          ingredientRemove={this.props.onIngredientRemove}
          disabled={disabledInfo}
          purchasable={purchasable}
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
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ 
      type: actionTypes.ADD_INGREDIENT,
      ingredientName  
    }),
    onIngredientRemoved: (ingredientName) => dispatch({ 
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName  
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
