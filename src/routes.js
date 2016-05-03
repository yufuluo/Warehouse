import React from "react";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Header } from "./components/header";
import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import Warehouse from "./components/warehouse";

import fullPath from "./util/fullPath";

export default (
  <Router history={browserHistory}>
	  <Route path={fullPath()} component={Header}>
      <IndexRoute component={Home} />
	    <Route path={fullPath("/signup")} component={Signup} />
      <Route path={fullPath("/login")} component={Login} />
      <Route path={fullPath("/warehouse")} component={Warehouse} />
	  </Route>
  </Router>
);
