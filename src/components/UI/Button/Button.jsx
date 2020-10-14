import React from "react";
import "./Button.css";

const Button = (props) => (
  <button
    disabled={props.disabled}
    className={props.disabled ? "Button ButtonDisabled" : "Button"}
    type={props.type}
  >
    {props.title}
  </button>
);

export default Button;
