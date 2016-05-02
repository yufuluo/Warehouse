import React from "react";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Header } from "./components/header";
import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import Warehouse from "./components/warehouse";

export default (
  <Router history={browserHistory}>
	  <Route path="/" component={Header}>
      <IndexRoute component={Home} />
	    <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/warehouse" component={Warehouse} />
	  </Route>
  </Router>
);
