import React, { Fragment } from "react";
import "./Header.css";
import Input from "../Input/Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSideNav } from "../../../store/actions/ui";
import { Link, withRouter } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const [search, changeSearch] = useState("");

  const userId = useSelector((state) => state.auth);

  console.log(props.location.pathname === "/login");

  const showNav = () => {
    dispatch(changeSideNav(true));
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    props.history.replace("/login");
  };

  return (
    <div className="Header">
      {props.location.pathname !== "/login" &&
      props.location.pathname !== "/signup" ? (
        <div className="Menu" onClick={showNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
      <div className="Logo">INNOLOFT-BELLO</div>
      <div className="Search">
        <Input
          placeholder="Enter Interest, keywords"
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
        />
      </div>
      <div className="Profile">
        {userId ? (
          <div onClick={logout}>Logout</div>
        ) : (
          <Fragment>
            <Link to="/login">Signin</Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
