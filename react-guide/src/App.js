import React, { Component } from "react";
import logo from "./logo.svg";
import Person from "./Person/Person";
import "./App.scss";

class App extends Component {
  state = {
    persons: [{ id: 1, name: "alex", age: 29 }, { id: 2, name: "max", age: 22 }],
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
      backgrpundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let personsWrap = null;
    if (showPersons) {
      personsWrap =  (
        <header className="App-header">
          {persons.map((person, index) => {
            return  <Person
                key={person.id}
                name={person.name}
                age={person.age}
                handleChange={(event) => this.handleNameChange(event, person.id)}
                handleDelete={() => this.handleDeletePerson(index)}
              >
                My hobbies - racing
            </Person>
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
    }

    return (
      <div className="App">
        <button style={style} onClick={this.togglePersonHandler}>Toggle Persons</button>

        {/* {
          showPersons && <header className="App-header">
            <Person
              name={persons[0].name}
              age={persons[0].age}
              handleChange={this.handleNameChange}
            >
              My hobbies - racing
            </Person>
            

            <Person
              name={this.state.person.name}
              age={this.state.person.age}
              handleChange={event => this.handleNameSwitch(event, "name")}
            >
              My hobbies - racing
            </Person>
          </header>
        } */}

        {personsWrap}
        <img src={logo} alt="react" />
      </div>
    );
    // return React.createElement('div', {className: 'app'}, 'h1', 'Hi, I\'m react app' );
  }
}

export default App;
