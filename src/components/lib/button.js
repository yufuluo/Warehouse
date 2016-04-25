import React from "react";

export const Button = (props) => (
  <button className={`button ${props.className || ""}`} onClick={props.onClick}>{props.value}</button>
);
