import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = ({
  ingredientAdd,
  ingredientRemove,
  disabled,
  price,
  purchasable,
  handlePurchase
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{price.toFixed(2)}$</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          ingredientAdd={() => ingredientAdd(ctrl.type)}
          ingredientRemove={() => ingredientRemove(ctrl.type)}
          label={ctrl.label}
          disabled={disabled[ctrl.type]}
        />
      ))}
      <button
        disabled={!purchasable}
        className={classes.OrderButton}
        onClick={handlePurchase}
      >
        Order Now
      </button>
    </div>
  );
};

export default buildControls;
