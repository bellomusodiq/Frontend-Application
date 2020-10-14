import React from "react";
import "./Select.css";

const Select = (props) => (
  <div className="Select">
    <div className="InputTitle">
      {props.title ? <p className="InputTitle">{props.title}</p> : null}
      {props.required ? <span>*</span> : null}
    </div>
    {props.error ? <p className="InputError">{props.error}</p> : null}
    <select value={props.value} onChange={props.onChange} >
      <option value="Select Coutry">Select Country</option>
      {props.options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
