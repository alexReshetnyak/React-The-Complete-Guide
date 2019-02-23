
import React, { Component } from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = ( WrappedComponent, axios, orders = null ) => {
  return class withErrorHandler extends Component {
    state = {
      error: null
    }
    
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error });
      });
    }

    componentWillUnmount() { // * Delete interceptors before component will be destroy         
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      const { error } = this.state;
      
      return (
        <Aux>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            { error ? error.message : null }
          </Modal>
          <WrappedComponent { ...this.props} />
        </Aux>
      )
    }
  }
}
 
export default withErrorHandler;
