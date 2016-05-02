import React from "react";

export const Header = (props) => {
  const firstName = props.location.query.name;
  return (
    <div>
      <h1>Welcome home, {firstName} !</h1>
        {props.children}
    </div>
  );
};
