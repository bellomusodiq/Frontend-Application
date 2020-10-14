import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSnackBar,
  updateFormField,
  updateUser,
} from "../../../../store/actions/auth";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import Snackbar from "../../../UI/Snackbar/Snackbar";
import "./AccountSettings.css";

const AccountSettings = () => {
  // local state to check if a field has been changed
  const [emailUpdated, changeEmailUpdated] = useState(false);
  const [passwordUpdated, changePasswordUpdated] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const passwordStrength = useSelector((state) => state.auth.passwordStrength);
  const confirmPassword = useSelector((state) => state.auth.confirmPassword);
  const passwordConfirmError = useSelector(
    (state) => state.auth.passwordValidationError
  );
  const updateSuccess = useSelector((state) => state.auth.updateUserSuccess);
  const showSnackBar = useSelector((state) => state.auth.showSnackBar);

  // disable button
  let isDisabled = true;
  if (emailUpdated && !passwordUpdated) {
    if (email.length > 0) {
      isDisabled = false;
    }
  } else if (!emailUpdated && passwordUpdated) {
    isDisabled = passwordStrength < 4 || password !== confirmPassword;
  } else if (emailUpdated && passwordUpdated) {
    isDisabled =
      email.length === 0 ||
      passwordStrength < 4 ||
      password !== confirmPassword;
  }

  const updateAccount = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    const data = {};
    if (emailUpdated) data.email = email;
    if (passwordUpdated) data.password = password;
    dispatch(updateUser(data));
  };
  const updateField = (field, value) => {
    if (field === "email") changeEmailUpdated(true);
    if (field === "password" || field === "confirmPassword")
      changePasswordUpdated(true);
    dispatch(updateFormField(field, value));
  };

  if (showSnackBar) {
    setTimeout(() => {
      dispatch(closeSnackBar());
    }, 3000);
  }

  return (
    <form className="AccountSettings" onSubmit={updateAccount}>
      {showSnackBar ? (
        <Snackbar
          success={updateSuccess}
          message={
            updateSuccess
              ? "User account updated successful"
              : "something went wrong"
          }
        />
      ) : null}
      <Input
        title="E-mail Address"
        onChange={(e) => updateField("email", e.target.value)}
        value={email}
      />
      <br />
      <Input
        title="Password"
        type="password"
        onChange={(e) => updateField("password", e.target.value)}
        value={password}
        showPasswordStrength
        passwordStrength={passwordStrength}
      />
      <br />
      <Input
        title="Password repeat"
        type="password"
        onChange={(e) => updateField("confirmPassword", e.target.value)}
        error={passwordConfirmError ? "Password do not match!" : null}
        value={confirmPassword}
      />
      <br />
      <Button disabled={isDisabled} type="submit" title="Submit" />
    </form>
  );
};

export default AccountSettings;
