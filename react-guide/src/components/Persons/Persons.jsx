import React from 'react';
import Person from "./Person/Person";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Persons = ({persons, handleChange, handleDelete, children}) => {
  return (
    <React.Fragment>
      {persons.map((person, index) => {
        return <ErrorBoundary key={person.id}>
            <Person
              name={person.name}
              age={person.age}
              handleChange={(event) => handleChange({ event, person })}
              handleDelete={() => handleDelete(index)}
            >
              My hobbies - racing
          </Person>
        </ErrorBoundary>
      })}

      {children}
    </React.Fragment>
  );
}
 
export default Persons;