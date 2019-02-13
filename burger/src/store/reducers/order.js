
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseBurgerSuccess = (state, orderData, orderId) => {
  const newOrder = updateObject(orderData, { id: orderId });
  const updatedPurchase = {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  };

  return updateObject(state, updatedPurchase);
};

const reducer = (state = initialState, action) => {
  const { type, orderData, orderId, orders } = action;
  
  switch (type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });

    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, orderData, orderId);
    
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
  
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders, loading: false });

    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });

    default: return state;
  }
};

export default reducer;
