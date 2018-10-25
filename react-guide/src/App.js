import React, { Component } from "react";
import Radium, { StyleRoot } from "radium"; // * Radium fot css rules like :hover, StyleRoot for css @media
import logo from "./logo.svg";
import Person from "./Person/Person";
import  "./App.scss";
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: "alex", age: 29 }, 
      { id: 2, name: "max", age: 22 },
      { id: 3, name: 'name', age: 21 }
    ],
    person: { id: 3, name: 'name', age: 21 },
    showPersons: false
  };

  handleNameSwitch = ({ target }, name) => {
    console.log('Person change');
    
    const person = {...this.state.person};
    person.name = target.value;
    this.setState({ person });
  };

  handleNameChange = ({ target }, personId ) => {
    console.log('NameChanged!');
    const persons = [...this.state.persons];

    const personIndex = persons.findIndex(p => {
      return p.id === personId;
    });

    const person = {
      ...persons[personIndex]
    };

    person.name = target.value;

    persons[personIndex] = person;

    this.setState({ persons });
  }

  togglePersonHandler = () => {
    console.log('Toggle Person');
    const showPersons = !this.state.showPersons;
    this.setState({showPersons});
  }

  handleDeletePerson = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);

    this.setState({persons});
    console.log('Delete Person');
  }

  render() {
    const { showPersons, persons } = this.state;
    const style = {
      backgroundColor: 'green',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      color: 'white',
      ':hover': {   // * Thank you Radium !
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let personsWrap = null;

    if (showPersons) {
      personsWrap =  (
        <header className="App-header">
          {persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
                <Person
                  name={person.name}
                  age={person.age}
                  handleChange={(event) => this.handleNameChange(event, person.id)}
                  handleDelete={() => this.handleDeletePerson(index)}
                >
                  My hobbies - racing
              </Person>
            </ErrorBoundary>
          })}

          <Person
            name={this.state.person.name}
            age={this.state.person.age}
            handleChange={event => this.handleNameSwitch(event, "name")}
            handleDelete={this.handleDeletePerson}
          >
            My hobbies - racing
          </Person>
        </header>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {   // * Thank you Radium !
        backgroundColor: 'lightblue',
        color: 'black'
      }
    }

    const classes = [];

    persons.length <= 1 && classes.push('red');
    persons.length <= 2 && classes.push('bold');

    return (
      <StyleRoot>  {/* Needed for implement @media in js file */}
        <div className='App'>
          <p className={classes.join(' ')}>This is working!</p>

          <button style={style} onClick={this.togglePersonHandler}>
            Toggle Persons
          </button>

          {personsWrap}
          <img src={logo} alt="react" />
        </div>
      </StyleRoot>
  
    );
    // return React.createElement('div', {className: 'app'}, 'h1', 'Hi, I\'m react app' );
  }
}

export default Radium(App); // * Applied Radium package to possibility use pseudo classes like :hover inside this Component
