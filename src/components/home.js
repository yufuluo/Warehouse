import React from "react";
import { Router, Link } from "react-router";

import fullPath from "../util/fullPath";

export default class Home extends React.Component {
  render() {
    return (
      <div className="float">
        <img className="home_img" src="http://trunkweed.com/uploads/posts/images/423076-rilakkuma-wallpaper-1920x1080.jpg"/>
        <Link className="B_left" to={fullPath("/signup")}>Sign up</Link>
        <Link className="B_right" to={fullPath("/login")}>Log in</Link>
      </div>
    );
  }
}
