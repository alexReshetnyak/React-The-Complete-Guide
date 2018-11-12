import React, { Component } from "react";

import axios from "../../axios-orders";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  async componentDidMount() {
    const { data: ingredients } = await axios.get('/ingredients.json');
    this.setState({ ingredients });
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

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState(
      { totalPrice: newPrice, ingredients: updatedIngredients },
      () => this.updatePurchaseState()
    );
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (!oldCount) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState(
      { totalPrice: newPrice, ingredients: updatedIngredients },
      () => this.updatePurchaseState()
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    // alert("You continue!");
    await this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Alex Resh',
        address: {
          street: 'Gagarina',
          zipCode: '1234',
          country: 'Ukraine'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    try {
      const res = await axios.post('/orders.json', order);
      this.setState({ loading: false, purchasing: false });
      console.log('Response:', res);
    } catch (error) {
      this.setState({ loading: false, purchasing: false });
    }
  };
  

  render() {
    const disabledInfo = { ...this.state.ingredients };
    const { ingredients, totalPrice, purchasable, purchasing, loading } = this.state;

    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = !disabledInfo[key];
      }
    }

    let orderSummary = <OrderSummary
                          ingredients={ingredients || {}}
                          price={totalPrice}
                          purchaseCanceled={this.purchaseCancelHandler}
                          purchaseContinued={this.purchaseContinueHandler}
                      />

    loading && (orderSummary = <Spinner />);

    let burger = (
      <React.Fragment >
        <Burger ingredients={ingredients} />
        <BuildControls
          price={totalPrice}
          ingredientAdd={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={purchasable}
          handlePurchase={this.purchaseHandler}
        />
      </React.Fragment> 
    );

    !ingredients && (burger = <Spinner />);

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

export default withErrorHandler(BurgerBuilder, axios);
