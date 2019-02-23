import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

  componentDidMount = async () => {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    const { orders, loading } = this.props;
    
    return loading ? 
      <Spinner /> : (
      <div>
        {
          orders && orders.map(order => 
            <Order 
              key={order.id}
              price={order.price} 
              ingredients={order.ingredients} />)
        }
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios, true)
);
