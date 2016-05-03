import React from "react";

export const Header = (props) => {
  const firstName = props.location.query.name;
  const content = firstName ? `Welcome home, ${firstName}!` : "Welcome";

  return (
    <div>
      <h1>{content}</h1>
        {props.children}
    </div>
  );
};
