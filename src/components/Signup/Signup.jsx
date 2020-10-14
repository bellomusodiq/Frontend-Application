import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  closeSnackBar,
  createUser,
  updateFormField,
} from "../../store/actions/auth";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Loading from "../UI/Loading";
import Select from "../UI/Select/Select";
import Snackbar from "../UI/Snackbar/Snackbar";
import "./Signup.css";

const Signup = (props) => {
  const dispatch = useDispatch();
  // get value of username and password in redux store
  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const confirmPassword = useSelector((state) => state.auth.confirmPassword);
  const passwordStrength = useSelector((state) => state.auth.passwordStrength);
  const passwordConfirmError = useSelector(
    (state) => state.auth.passwordValidationError
  );
  const email = useSelector((state) => state.auth.email);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const houseNumber = useSelector((state) => state.auth.houseNumber);
  const street = useSelector((state) => state.auth.street);
  const postalCode = useSelector((state) => state.auth.postalCode);
  const countries = useSelector((state) => state.auth.countries);
  const country = useSelector((state) => state.auth.country);
  const loading = useSelector((state) => state.auth.loading);
  const signupSuccess = useSelector((state) => state.auth.signupSuccess);
  const error = useSelector((state) => state.auth.signupError);
  const showSnackBar = useSelector((state) => state.auth.showSnackBar);

  // update the field in redux store
  const updateField = (field, value) => {
    dispatch(updateFormField(field, value));
  };

  // Signup via redux saga in the store
  const signupSubmit = (e) => {
    e.preventDefault();
    // password validity and match check
    if (passwordStrength < 4 || password !== confirmPassword) return;
    // request body data
    const data = {
      username: username,
      email: email,
      first_name: firstName,
      last_name: lastName,
      house_number: houseNumber,
      street: street,
      postal_code: postalCode,
      country: country,
      password: password,
    };
    dispatch(createUser(data));
  };

  if (signupSuccess) {
    setTimeout(() => {
      dispatch(closeSnackBar());
      props.history.replace("/login");
    }, 3000);
  }

  if (error) {
    setTimeout(() => {
      dispatch(closeSnackBar());
    }, 3000);
  }

  let signupContent;
  signupContent = (
    <form className="SignupForm" onSubmit={signupSubmit}>
      {loading ? <Loading /> : null}
      {showSnackBar ? (
        <Snackbar
          message={
            error ? "something went wrong" : "user account created successfully"
          }
          success={signupSuccess}
        />
      ) : null}
      <Input
        title="username"
        value={username}
        error={error ? error.username : null}
        onChange={(e) => updateField("username", e.target.value)}
        type="input"
        required
      />
      <br />
      <Input
        title="email"
        error={error ? error.email : null}
        value={email}
        onChange={(e) => updateField("email", e.target.value)}
        type="input"
        required
      />
      <br />
      <Input
        title="firstName"
        value={firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
        type="input"
        required
      />
      <br />
      <Input
        title="lastName"
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
      <Select
        title="country"
        onChange={(e) => updateField("country", e.target.value)}
        value={country}
        options={countries}
      />
      <br />
      <Input
        required
        title="Password"
        type="password"
        onChange={(e) => updateField("password", e.target.value)}
        value={password}
        showPasswordStrength
        passwordStrength={passwordStrength}
      />
      <br />
      <Input
        required
        title="Password repeat"
        type="password"
        onChange={(e) => updateField("confirmPassword", e.target.value)}
        error={passwordConfirmError ? "Password do not match!" : null}
        value={confirmPassword}
      />
      <Button
        disabled={passwordStrength < 4 || password !== confirmPassword}
        type="submit"
        title="Submit"
      />
    </form>
  );

  return (
    <div className="Signup">
      <Card>
        <h1>Signup</h1>
        {signupContent}
        <p>
          Login{" "}
          <Link className="LoginSignupNav" to="/login">
            here
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default withRouter(Signup);
