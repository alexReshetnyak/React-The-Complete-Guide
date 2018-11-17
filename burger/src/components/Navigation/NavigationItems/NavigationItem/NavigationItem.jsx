import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.css";

const navigationItem = ({ children, link }) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} className="NavLink">
        {children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
