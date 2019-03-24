import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.css";

const checkoutSummary = ({
  ingredients,
  checkoutCanceled,
  checkoutContinued
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it work fine!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
