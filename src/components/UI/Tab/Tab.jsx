import React from "react";
import "./Tab.css";

const Tab = (props) => {
  return (
    <div className="Tab">
      <div className="TabHeader">
        <div
          onClick={() => props.changeTab("account")}
          className={props.active !== "account" ? "TabHeaderInActive" : null}
        >
          Account Settings
        </div>
        <div
          onClick={() => props.changeTab("user")}
          className={props.active !== "user" ? "TabHeaderInActive" : null}
        >
          User Information
        </div>
      </div>
      <div className="TabBody">
        {props.active === "account" ? props.accountSettings : null}
        {props.active === "user" ? props.userInformation : null}
      </div>
    </div>
  );
};

export default Tab;
