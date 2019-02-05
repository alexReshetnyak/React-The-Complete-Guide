import React, { Component } from 'react';

import Counter from './containers/Counter/Counter.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Counter />
      </div>
    );
  }
}

export default App;
