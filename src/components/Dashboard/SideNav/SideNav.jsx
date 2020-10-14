import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeSideNav } from "../../../store/actions/ui";
import "./SideNav.css";
import SideNavItem from "./SideNavItem";

const SideNav = (props) => {
  const dispatch = useDispatch();
  let transformX = "translateX(-100vw)";
  if (window.screen.width > 500) transformX = "translateX(0)";
  else if (window.screen.width <= 500 && props.showSideNav) {
    transformX = "translateX(0)";
  }

  const closeSideNav = () => {
    dispatch(changeSideNav(false));
  };

  return (
    <div
      className="SideNav"
      style={{
        transform: transformX,
      }}
    >
      <SideNavItem
        closeSideNav={closeSideNav}
        link="/dashboard"
        active={props.history.location.pathname === "/dashboard"}
        className="fas fa-home"
        title="Home"
      />
      <SideNavItem
        closeSideNav={closeSideNav}
        link="/dashboard/account"
        active={props.history.location.pathname === "/dashboard/account"}
        className="fas fa-bullhorn"
        title="My Account"
      />
      <SideNavItem
        closeSideNav={closeSideNav}
        link="/dashboard/company"
        active={props.history.location.pathname === "/dashboard/company"}
        className="fas fa-building"
        title="My Company"
      />
      <SideNavItem
        closeSideNav={closeSideNav}
        link="/dashboard/settings"
        active={props.history.location.pathname === "/dashboard/settings"}
        className="fas fa-cog"
        title="Settings"
      />
      <SideNavItem
        closeSideNav={closeSideNav}
        link="/dashboard/news"
        active={props.history.location.pathname === "/dashboard/news"}
        className="far fa-newspaper"
        title="News"
      />
      <SideNavItem
        closeSideNav={closeSideNav}
        link="/dashboard/analytics"
        active={props.history.location.pathname === "analytics"}
        className="fas fa-chart-area"
        title="Analytics"
      />
    </div>
  );
};

export default withRouter(SideNav);
