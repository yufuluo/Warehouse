import React from "react";
import { Router, Route, browserHistory } from 'react-router'
import Home from "./components/home";
import Signup from "./components/signup";

export default (
  <Router history={browserHistory}>
	  <Route path="/" component={Home}>
	    <Route path="signup" component={Signup} />
	  </Route>
  </Router>
);
