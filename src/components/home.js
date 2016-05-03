import React from "react";
import { Router, Link } from "react-router";

import fullPath from "../util/fullPath";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Link to={fullPath("/signup")}>Sign up</Link><br/>
        <Link to={fullPath("/login")}>Log in</Link>
      </div>
    );
  }
}
