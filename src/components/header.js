import React from "react";
import Logout from "./logout";

export const Header = (props) => {
  const firstName = props.location.query.name;
  const content = firstName ? `Welcome home, ${firstName}!` : "Welcome";

  return (
    <div>
      <h1>
        {content}
        <Logout />
      </h1>
      {props.children}
    </div>
  );
};
