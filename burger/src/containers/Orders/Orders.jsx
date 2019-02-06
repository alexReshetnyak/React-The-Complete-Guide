import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: null,
    loading: null
  }

  componentDidMount = async () => {
    try {
      await this.setState({loading: true});

      const { data } = await axios.get('/orders.json');
      const orders = Object.keys(data).map( key => Object.assign({}, { id: key }, {...data[key]}));

      // console.log('Orders:', orders);
      
      this.setState({ loading: false, orders });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { orders } = this.state;
    
    return (
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
}
 
export default withErrorHandler(Orders, axios);