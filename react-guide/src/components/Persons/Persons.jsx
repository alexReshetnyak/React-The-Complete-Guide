import React, { PureComponent } from "react";
import Person from "./Person/Person";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class Persons extends PureComponent {
  constructor(props) {
    super(props);
    console.log("[Persons] Constructor Start!");
    this.lastPersonRef = React.createRef();
  }

  componentWillMount() {
    // console.log('[Persons] Component will mount!');
  }

  componentDidMount() {
    // console.log('[Persons] Component Did mount!');
    this.lastPersonRef.current.focus();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('[UPDATE Persons] Component Will Receive Props', nextProps);
  }

  // * Used PureComponent instead method bellow
  // shouldComponentUpdate(nextProps, nextState) { // ! Should return true or fa;se, if false changes will not go forward to child components
  //   console.log('[UPDATE Persons] Should Component Update', nextProps, nextState);
  //   return nextProps.persons !== this.props.persons ||
  //     nextProps.handleChange !== this.props.handleChange ||
  //     nextProps.handleDelete !== this.props.handleDelete; // * This method used to increase app speed
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    // console.log('[UPDATE Persons] Component Will Update', nextProps, nextState);
  }

  componentDidUpdate() {
    // console.log('[UPDATE Persons] Component Did Update');
  }

  render() {
    // console.log('[Persons] Render method was called');

    const { persons, handleChange, handleDelete, children } = this.props;

    return (
      <React.Fragment>
        {persons.map((person, index) => {
          return (
            <ErrorBoundary key={person.id}>
              <Person
                name={person.name}
                age={person.age}
                position={index}
                ref={this.lastPersonRef}
                handleChange={event => handleChange({ event, person })}
                handleDelete={() => handleDelete(index)}
              >
                My hobbies - racing
              </Person>
            </ErrorBoundary>
          );
        })}

        {children}
      </React.Fragment>
    );
  }
}

export default Persons;
