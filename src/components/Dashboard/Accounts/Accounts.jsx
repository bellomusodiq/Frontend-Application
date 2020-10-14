import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../UI/Card/Card";
import Tab from "../../UI/Tab/Tab";
import "./Accounts.css";
import AccountSettings from "./AccountSettings/AccountSettings";
import UserInformation from "./UserInformation/UserInformation";

const Accounts = (props) => {
  const username = useSelector((state) => state.auth.username);
  const [tab, changeTab] = useState("account"); // [account, user]
  return (
    <div className="Accounts">
      <h3>Welcome {username}</h3>
      <Card>
        <Tab
          accountSettings={<AccountSettings />}
          userInformation={<UserInformation />}
          active={tab}
          changeTab={(val) => changeTab(val)}
        />
      </Card>
    </div>
  );
};

export default Accounts;
