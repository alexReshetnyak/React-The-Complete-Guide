import React  from 'react';
import classes from "./Modal.css";
import Aux from "../../../hoc/wrapper/Wrapper";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  const { children, show, modalClosed } = props;

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== props.show || nextProps.children !== props.children;
  // }

  return (
    <Aux>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0"
        }}
      >
        {children}
      </div>
    </Aux>
  );
}
 
export default React.memo( //* Instead shouldComponentUpdate hook
  Modal, 
  (prevProps, nextProps) =>  // * we using additional functional if we want to check not all props properties but sum of them
    nextProps.show === prevProps.show && // * if expression returns true component won't update 
    nextProps.children === prevProps.children
);
