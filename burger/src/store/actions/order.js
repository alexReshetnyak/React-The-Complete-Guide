
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const { data: createdOrder } = await axios.post(`/orders.json?auth=${token}`, orderData);
      
      dispatch(purchaseBurgerSuccess(createdOrder.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};


export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return async (dispatch/*, getState*/) => {
    try {
      dispatch(fetchOrderStart());
      
      const queryParams = {
        auth    : token,
        orderBy : '"userId"',
        equalTo : `"${userId}"`
      };

      const { data: orders } = await axios.get(
        `/orders.json`,
        { params: queryParams }
      );
      
      const fetchedOrders = Object.keys(orders).map(key => 
        Object.assign({}, { id: key }, {...orders[key]})
      );

      dispatch(fetchOrderSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrderFail(error));
    }
  };
};
