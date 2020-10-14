import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  closeSnackBar,
  loginAction,
  updateFormField,
} from "../../store/actions/auth";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Loading from "../UI/Loading";
import Snackbar from "../UI/Snackbar/Snackbar";
import "./Login.css";

const Login = (props) => {
  const dispatch = useDispatch();
  // get value of username and password in redux store
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const loading = useSelector((state) => state.auth.loading);
  const loginSuccess = useSelector((state) => state.auth.loginSuccess);
  const error = useSelector((state) => state.auth.loginError);
  const showSnackBar = useSelector((state) => state.auth.showSnackBar);

  // take care of feedback
  if (loginSuccess) {
    setTimeout(() => {
      dispatch(closeSnackBar());
      props.history.replace("/dashboard/account");
    }, 1500);
  }

  // handle error
  if (error) {
    setTimeout(() => {
      dispatch(closeSnackBar());
    }, 3000);
  }

  // update the field in redux store
  const updateField = (field, value) => {
    dispatch(updateFormField(field, value));
  };

  // login via redux saga in the store
  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };
    dispatch(loginAction(data));
  };

  return (
    <div className="Login">
      {loading ? <Loading /> : null}
      {showSnackBar ? (
        <Snackbar
          message={error ? "something went wrong" : "login successful"}
          success={loginSuccess}
        />
      ) : null}
      <Card>
        <h1>Login</h1>
        <form className="LoginForm" onSubmit={loginSubmit}>
          {error ? <p style={{ color: "tomato" }}>{error}</p> : null}
          <Input
            title={"username"}
            value={username}
            onChange={(e) => updateField("username", e.target.value)}
            type="input"
            required
          />
          <br />
          <Input
            title={"password"}
            value={password}
            onChange={(e) => updateField("password", e.target.value)}
            type="password"
            required
          />
          <Button title="Submit" type="submit" />
        </form>
        <p >Register <Link className="LoginSignupNav" to="/signup">here</Link></p>
      </Card>
    </div>
  );
};

export default withRouter(Login);
