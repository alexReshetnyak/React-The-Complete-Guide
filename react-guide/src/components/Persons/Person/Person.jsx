import React, { Component } from "react";
import Radium from "radium";
import PropTypes from "prop-types";
import "./Person.scss";
import { AuthContext } from "../../../containers/App"; //* Receive data through many components

class Person extends Component {
  constructor(props) {
    super(props);
    console.log("[Person] Constructor Start!");
    this.inputElement = React.createRef();
  }

  componentWillMount() {
    // console.log('[Person] Component will mount!');
  }

  componentDidMount() {
    // console.log('[Person] Component Did mount!');
    // this.props.position === 0 && this.inputElement.current.focus();
  }

  focus() {
    this.inputElement.current.focus();
  }

  render() {
    // console.log('[Person] Render method was called');

    const style = {
      "@media (min-width: 1200px)": {
        width: "450px"
      }
    };

    const { handleDelete, age, name, handleChange, children } = this.props;

    return (
      <div className="Person" style={style}>
        <AuthContext.Consumer>
          {auth => (auth ? <p>Authenticated</p> : null)}
        </AuthContext.Consumer>

        <h1 onClick={handleDelete}>
          Hi I'm a {name} and I'm {age} years old!
        </h1>
        <p>{children}</p>
        <input
          ref={this.inputElement}
          type="text"
          onChange={handleChange}
          value={name}
        />
      </div>
    );
  }
}

Person.propTypes = {
  handleDelete: PropTypes.func,
  age: PropTypes.number,
  name: PropTypes.string,
  handleChange: PropTypes.func
};

export default Radium(Person);
