import React from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = ({ children }) => {
  return (
    <Aux>
      <Toolbar/>
      <main className={classes.Content}>{children}</main>
    </Aux>
  );
};

export default layout;
