import React from "react";
import Logout from "./logout";

export const Header = (props) => {
  const firstName = props.location.query.name;

  return (
    <div>
      <div className="header">
        <h1>
          {firstName ? `Welcome home, ${firstName}!` : "Welcome to BearHouse!"}
          {firstName ? <Logout /> : null}
        </h1>
      </div>
      <div>
         <h1 className="hidden">This is a hidden heading</h1>
      </div>
      <div>
          {props.children}
      </div>
    </div>
  );
};
