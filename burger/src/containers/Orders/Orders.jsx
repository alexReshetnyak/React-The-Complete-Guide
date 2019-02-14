import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

  componentDidMount = async () => {
    this.props.onFetchOrders(this.props.token);
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
    token: state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
