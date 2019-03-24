import React, { PureComponent } from "react";
import Radium, { StyleRoot } from "radium"; // * Radium fot css rules like :hover, StyleRoot for css @media

import "./App.scss";

import logo from "../logo.svg";
import Person from "../components/Persons/Person/Person";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import withClass from "../hoc/withClass";

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log("Constructor Start!", props);
  }

  componentWillMount() {
    // console.log('Component will mount!');
  }

  componentDidMount() {
    // console.log('Component Did mount!');
  }

  // shouldComponentUpdate(nextProps, nextState) { // ! Should return true or fa;se, if false DOM will not update
  //   console.log('[UPDATE] Should Component Update', nextProps, nextState);
  //   return true; // * This method used to increase app speed
  // }

  componentWillUpdate(nextProps, nextState) {
    //console.log('[UPDATE] Component Will Update', nextProps, nextState);
  }

  componentDidUpdate() {
    // console.log('[UPDATE] Component Did Update');
  }

  static getDerivedStateFromProps(nextProps, prevState) { // * React 16 LifeCircle 
    // * Called when all props updated 
    console.log('[UPDATE] Get Derived State From Props', nextProps, prevState);

    return prevState; // * The same like this.setState();
  }

  getSnapshotBeforeUpdate() {// * React 16 LifeCircle Executed before DOM will update
    console.log('[UPDATE] Get Snapshot Before Update');
  }

  state = {
    persons: [
      { id: 1, name: "alex", age: 29 },
      { id: 2, name: "max", age: 22 },
      { id: 3, name: "name", age: 21 }
    ],
    person: { id: 3, name: "name", age: 21 },
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
  };

  handleNameSwitch = ({ target }, name) => {
    console.log("Person change");

    const person = { ...this.state.person };
    person.name = target.value;
    this.setState({ person });
  };

  handleNameChange = ({ target }, personId) => {
    console.log("NameChanged!");
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
  };

  togglePersonHandler = () => {
    console.log("Toggle Show Persons");
    const showPersons = !this.state.showPersons;
    this.setState((prevState, props) => {
      // * If we need to access to prevState inside setState we need use this approach
      return {
        showPersons,
        toggleClicked: prevState.toggleClicked + 1
      };
    });
  };

  handleDeletePerson = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);

    this.setState({ persons });
    console.log("Delete Person");
  };

  handleLogin = () => {
    console.log("Login");
    this.setState({ authenticated: true });
  };

  render() {
    // console.log('Render method called');

    const { showPersons, persons, toggleClicked, authenticated } = this.state;

    let personsWrap = null;

    if (showPersons) {
      personsWrap = (
        <header className="App-header">
          <Persons
            persons={persons}
            handleChange={({ event, person }) =>
              this.handleNameChange(event, person.id)
            }
            handleDelete={index => this.handleDeletePerson(index)}
          >
            <Person
              name={this.state.person.name}
              age={this.state.person.age}
              handleChange={event => this.handleNameSwitch(event, "name")}
              handleDelete={this.handleDeletePerson}
            >
              My hobbies - racing
            </Person>
          </Persons>
        </header>
      );
    }

    return (
      <StyleRoot>
        {/* Needed for implement @media in js file */}
        <button onClick={() => this.setState({ showPersons: true })}>
          Show Persons
        </button>
        <p>{toggleClicked}</p>
        <Cockpit
          togglePersonHandler={this.togglePersonHandler}
          showPersons={showPersons}
          persons={persons}
          handleLogin={this.handleLogin}
        />
        <AuthContext.Provider value={authenticated}>
          {personsWrap}
        </AuthContext.Provider>
        {/* React 16 feature for transport data through components */}

        <img src={logo} alt="react" />
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'app'}, 'h1', 'Hi, I\'m react app' );
  }
}

export default withClass(Radium(App), "App"); // * Applied Radium package to possibility use pseudo classes like :hover inside this Component
