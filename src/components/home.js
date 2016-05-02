import React from "react";
import { Router, Link } from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Link to="/signup">Sign up</Link><br/>
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}
