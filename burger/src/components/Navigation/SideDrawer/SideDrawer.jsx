import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import BackDrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = ({ closed, open, isAuth }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  open && (attachedClasses = [classes.SideDrawer, classes.Open]);

  return (
    <React.Fragment>
      <BackDrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")} onClick={closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
