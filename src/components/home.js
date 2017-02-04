import React from "react";
import { Router, Link } from "react-router";

import fullPath from "../util/fullPath";

export default class Home extends React.Component {
  render() {
    return (
      <div className="float">
        <img className="home_img" src="pics/homepage_background.jpg"/>
        <Link className="B_left" to={fullPath("/signup")}>SIGN UP</Link>
        <Link className="B_right" to={fullPath("/login")}>LOG IN</Link>
      </div>
    );
  }
}
