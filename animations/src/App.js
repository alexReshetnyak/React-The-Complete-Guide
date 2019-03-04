import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  }

  showModal = () => {    
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={
            () => this.setState(prevState => ({ showBlock: !prevState.showBlock }))
          }>
          Toggle
        </button> <br /> <br />
        <Transition 
          in={this.state.showBlock} 
          timeout={1000}
          onEnter={() => console.log('On Animation Enter')}
          onEntering={() => console.log('On Animation Entering')}
          onEntered={() => console.log('On Animation Entered')}
          onExit={() => console.log('On Animation Exit')}
          onExiting={() => console.log('On Animation Exiting')}
          onExited={() => console.log('On Animation Exited')}
          mountOnEnter 
          unmountOnExit>
          {state => (
            <div style={{
              backgroundColor: 'red',
              width: 100,
              height: 100,
              margin: 'auto',
              transition: 'all 1s ease-out',
              opacity: state === 'exiting' ? 0 : 1
            }}>
            </div>
          )}
        </Transition>
          <br />
          <Modal show={this.state.modalIsOpen} closed={this.closeModal}/>
        {
          this.state.modalIsOpen && 
          <Backdrop show />
        }
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
