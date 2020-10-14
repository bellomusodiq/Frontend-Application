import React from "react";
import "./Input.css";

const strengthColors = {
  1: "red",
  2: "yellow",
  3: "lightblue",
  4: "lightgreen",
};

const Input = (props) => (
  <div className="InputContainer">
    <div className="InputTitle">
      {props.title ? <p className="InputTitle">{props.title}</p> : null}
      {props.required ? <span>*</span> : null}
    </div>
    {props.error ? <p className="InputError">{props.error}</p> : null}
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className="Input"
      required={props.required}
    />
    {props.showPasswordStrength ? (
      <div className="PasswordStrength">
        <p>Password Strength</p>
        <div className="Indicator">
          <div
            style={{
              width: `${(props.passwordStrength / 4) * 100}%`,
              backgroundColor: strengthColors[props.passwordStrength],
            }}
          ></div>
        </div>
      </div>
    ) : null}
  </div>
);

export default Input;
