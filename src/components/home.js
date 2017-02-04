import React from "react";
import { Router, Link } from "react-router";

import fullPath from "../util/fullPath";
import create from "../pics/push-pin.svg";
import manage from "../pics/name.svg";
import update from "../pics/eye-button.svg";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="float home_bg home">
          <img className="home_img" src="pics/homepage_background.jpg"/>
          <div className="create">
            <img className="home_icon" src={create} alt="create"/>
            <h3>Create</h3>
            <p>Create your own bearhouse den account today to start organizing your products.</p>
          </div>
          <div className="manage">
            <img className="home_icon" src={manage} alt="manage"/>
            <h3>Manage</h3>
            <p>Manage your porduct warehouse by adding and deleting items.</p>
          </div>
          <div className="update">
            <img className="home_icon" src={update} alt="update"/>
            <h3>Update</h3>
            <p>Update porduct information to the newest version easily.</p>
          </div>
          <Link className="B_left" to={fullPath("/signup")}>SIGN UP</Link>
          <Link className="B_right" to={fullPath("/login")}>LOG IN</Link>
        </div>
      </div>
    );
  }
}
