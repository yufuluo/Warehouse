import React from "react";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Header from "./components/header";
import Home from "./components/home";
import Signup from "./components/signup";

export default (
  <Router history={browserHistory}>
	  <Route path="/" component={Header}>
      <IndexRoute component={Home} />
	    <Route path="/signup" component={Signup} />
	  </Route>
  </Router>
);
