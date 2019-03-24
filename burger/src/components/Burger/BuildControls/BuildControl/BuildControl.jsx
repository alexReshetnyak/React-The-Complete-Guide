import React from "react";
import classes from "./BuildControl.css";

const buildControl = ({ label, ingredientAdd, ingredientRemove, disabled }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button
        className={classes.Less}
        onClick={ingredientRemove}
        disabled={disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={ingredientAdd}>
        More
      </button>
    </div>
  );
};

export default buildControl;
