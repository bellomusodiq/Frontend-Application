import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Accounts from "./Accounts/Accounts";
import "./Dashboard.css";
import SideNav from "./SideNav/SideNav";
import Backdrop from "../UI/Backdrop/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { changeSideNav } from "../../store/actions/ui";
import { getUser } from "../../store/actions/auth";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const showSideNav = useSelector((state) => state.ui.showSideNav);
  const toggleSideNav = (value) => {
    dispatch(changeSideNav(value));
  };
  // api request to check if user is logged in
  // or token is still valid in localStorage
  const getUserError = useSelector((state) => state.auth.getUserError);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  // if user fetch error, remove token and user id, might've expired
  // then redirect to login
  if (getUserError) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    props.history.replace("/login");
  }
  return (
    <div className="Dashboard">
      {/* Aside and Main content */}
      <SideNav
        showBackdrop={() => toggleSideNav(true)}
        showSideNav={showSideNav}
      />
      {showSideNav ? <Backdrop close={() => toggleSideNav(false)} /> : null}
      <div className="Main">
        <Switch>
          <Route path="/dashboard" component={Accounts} />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
