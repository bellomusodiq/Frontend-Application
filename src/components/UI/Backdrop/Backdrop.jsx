import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => (
  <div className="Backdrop" onClick={props.close}></div>
);

export default Backdrop;
