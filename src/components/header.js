import React from "react";

export const Header = (props) => (
  <div>
    <h1>Welcome</h1>
    {props.children}
  </div>
);