import React from 'react';
import Transition from "react-transition-group/Transition";

import './Modal.css';

const animationTiming = {
    enter: 400,
    exit: 1000
};

const modal = ({ show, closed }) => {
    const classes = ['Modal'];
    
    return (
        <Transition 
            in={show}
            mountOnEnter 
            unmountOnExit 
            timeout={animationTiming}>
            {state => {
                const controlClass = state === 'entering' ? 
                    'ModalOpen': 
                    state === 'exiting' ?
                        'ModalClosed': null;
                
                controlClass && classes.push(controlClass);

                return (
                    <div className={classes.join(' ')}>
                        <h1>A Modal</h1>
                        <button className="Button" onClick={closed}>Dismiss</button>
                    </div>
                );
            }}
        </Transition>
    );
}

export default modal;