import React, { Component } from "react";
import logo from "./logo.svg";
import Person from "./Person/Person";
import "./App.scss";

class App extends Component {
  state = {
    persons: [{ name: "alex", age: 29 }, { name: "max", age: 22 }],
    person: {name: 'name', age: 21}
  };

  handleNameSwitch = ({ target }, name) => {
    // const persons = [...this.state.persons];
    // const personIndex = persons.findIndex(person => person.name === name);
    // const newPerson = { ...persons[personIndex] };

    const person = {...this.state.person};
    person.name = target.value;
    this.setState({ person });

    target.focus();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.persons.map(person => (
            <Person
              key={person.name}
              name={person.name}
              age={person.age}
              handleChange={event => this.handleNameSwitch(event, person.name)}
            >
              My hobbies - racing
            </Person>
          ))}

          <Person
              name={this.state.person.name}
              age={this.state.person.age}
              handleChange={event => this.handleNameSwitch(event, "name")}
            >
              My hobbies - racing
            </Person>
        </header>
        <img src={logo} alt="react" />
      </div>
    );
    // return React.createElement('div', {className: 'app'}, 'h1', 'Hi, I\'m react app' );
  }
}

export default App;
