import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.css";

const navigationItems = ({ isAuthenticated }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact active>
        Burger Builder
      </NavigationItem>
      { 
        isAuthenticated && 
        <NavigationItem link="/orders">
          Orders
        </NavigationItem>
      }
      {
        isAuthenticated ?
          <NavigationItem link="/logout">Logout</NavigationItem> :
          <NavigationItem link="/auth">Authenticate</NavigationItem>
      }
    </ul>
  );
};

export default navigationItems;
