import React from "react";

export const Button = (props) => (
  <button className={`button ${props.className || ""}`}>{props.value}</button>
);
