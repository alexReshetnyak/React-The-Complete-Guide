
import React from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../wrapper/Wrapper";
import { useHttpErrorHandler } from '../../hooks/httpErrorHandler';

const withErrorHandler = ( WrappedComponent, axios, orders = null ) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          { error ? error.message : null }
        </Modal>
        <WrappedComponent { ...props} />
      </Aux>
    );
  }
}
 
export default withErrorHandler;
