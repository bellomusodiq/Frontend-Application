import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar, updateFormField, updateUser } from "../../../../store/actions/auth";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import Snackbar from "../../../UI/Snackbar/Snackbar";
import "./UserInformation.css";

const UserInformation = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const houseNumber = useSelector((state) => state.auth.houseNumber);
  const street = useSelector((state) => state.auth.street);
  const postalCode = useSelector((state) => state.auth.postalCode);
  const updateSuccess = useSelector((state) => state.auth.updateUserSuccess);
  const showSnackBar = useSelector((state) => state.auth.showSnackBar);

  const updateAccount = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      house_number: houseNumber,
      street: street,
      postal_code: postalCode,
    };
    dispatch(updateUser(data));
  };

  const updateField = (field, value) => {
    dispatch(updateFormField(field, value));
  };

  if (showSnackBar) {
    setTimeout(() => {
      dispatch(closeSnackBar());
    }, 3000);
  }

  return (
    <form className="UserInformation" onSubmit={updateAccount}>
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
        title="Firstname"
        value={firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
        type="input"
        required
      />
      <br />
      <Input
        title="Lastname"
        value={lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
        type="input"
        required
      />
      <br />
      <Input
        title="House Number"
        value={houseNumber}
        onChange={(e) => updateField("houseNumber", e.target.value)}
        type="input"
        required
      />
      <br />
      <Input
        title="street"
        value={street}
        onChange={(e) => updateField("street", e.target.value)}
        type="input"
        required
      />
      <br />
      <Input
        title="Postal Code"
        value={postalCode}
        onChange={(e) => updateField("postalCode", e.target.value)}
        type="input"
        required
      />
      <br />
      <Button type="submit" title="Submit" />
    </form>
  );
};

export default UserInformation;
