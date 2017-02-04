import React from "react";
import Logout from "./logout";
import panda from "../pics/google-panda-circular-symbol.svg";
import linkedin from "../pics/linkedin.svg";
import girl from "../pics/girl-face.svg";

export const Header = (props) => {
  const firstName = props.location.query.name;

  return (
    <div>
      <div className="header">
        <img className="header_img_left" src={panda} alt="panda"/>
        <h1>
          {firstName ? `Welcome home, ${firstName}!` : "Welcome to BearHouse!"}
          {firstName ? <Logout /> : 
            <a href="https://www.linkedin.com/in/qijun-kay-liu-9283ba34/"><img className="header_img_right" src={linkedin} alt="linkedin"/></a>}
          {firstName ? null : 
            <a href="https://www.google.com"><img className="header_img_right" src={girl} alt="personal page"/></a>}
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
