import React from "react";
import "./Snackbar.css";

const Snackbar = (props) => {
  return (
    <div
      style={{ color: props.success ? "green" : "red" }}
      className="Snackbar"
    >
      {props.message}
    </div>
  );
};

export default Snackbar;
