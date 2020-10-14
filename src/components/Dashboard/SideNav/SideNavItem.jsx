import React from "react";
import { Link } from "react-router-dom";

const SideNavItem = (props) => (
  <Link
    onClick={props.closeSideNav}
    to={props.link}
    className={props.active ? "SideNavItem Active" : "SideNavItem"}
  >
    <span>
      <i className={props.className}></i>
    </span>
    <p>{props.title}</p>
  </Link>
);

export default SideNavItem;
