import React from "react";
import fullPath from "../util/fullPath";
import { browserHistory } from "react-router";

function handleLogout() {
  fetch(`/api/logout`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  }).then(() => {
    browserHistory.push(`${fullPath()}`);
  });
}

export default () => (
  <a href="#" className="logout" onClick={handleLogout}>Log out</a>
);
