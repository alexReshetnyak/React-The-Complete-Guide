import React from "react";
import "./Cockpit.scss";

const Cockpit = ({
  togglePersonHandler,
  showPersons,
  handleLogin,
  persons = []
}) => {
  const classes = [];

  persons.length <= 1 && classes.push("red");
  persons.length <= 2 && classes.push("bold");

  const style = {
    backgroundColor: "green",
    border: "1px solid blue",
    padding: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    ":hover": {
      // * Thank you Radium !
      backgroundColor: "lightgreen",
      color: "black"
    }
  };

  if (showPersons) {
    style.backgroundColor = "red";
    style[":hover"] = {
      // * Thank you Radium !
      backgroundColor: "lightblue",
      color: "black"
    };
  }

  return (
    <React.Fragment>
      <div className="Cockpit">
        <p className={classes.join(" ")}>This is working!</p>

        <button style={style} onClick={togglePersonHandler}>
          Toggle Persons
        </button>
        <button onClick={handleLogin}>Log in</button>
      </div>
    </React.Fragment>
  );
};

export default Cockpit;
