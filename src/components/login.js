import React from "react";
import { Router, browserHistory } from "react-router";
import fetch from "isomorphic-fetch";
import { Button } from "./lib/button";

import { validateEmail, validateEmpty} from "../util/validation";
import fullPath from "../util/fullPath";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      password: "",
      error: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    //if (!this.refs.form.isValidForm()) {
    //  throw "Invalid form";
    //}

    const data = {
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim()
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.success) {
        browserHistory.push(`${fullPath("/warehouse")}?name=${res.firstName}&id=${res.userId}`);
      } else if (res.error === "USER_DOSE_NOT_EXIST") {
        this.setState({error: "Account with this email address does not exist."});
      } else if (res.error === "WRONG_PASSWORD") {
        this.setState({error: "Incorrect password."});
      } else {
        this.setState({error: "There's an error in our den, please try again later."});
      }
    }).catch((err) => {
      console.log(err);
      this.setState({error: "There's an error in our den, please try again later."});
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.context.router.goBack();
  }

  render() {
    return ( 
      <div className="bgcolor login">
      <div className="center_box background">
        {this.state.error && <h3 className="center warning">{this.state.error}</h3>}
        <h3 className="center"> ʕ•̀ω•́ʔ  Welcome back! ʕ•̀ω•́ʔ </h3>
        <h3 className="center"> Your BearHouse is waiting for you! </h3>
        <form ref="form">
          <label>
            Email
            <input
              className="ui-input inputField" 
              type="text" 
              placeholder="Email" 
              name="email" 
              ref="email" 
              invalidClassName="ui-error"
              onChange={validateEmail}
            />
          </label>

          <label>
            Password
            <input
              className="ui-input inputField" 
              type="password"
              placeholder="Password" 
              name="password" 
              ref="password" 
              invalidClassName="ui-error"
              onChange={validateEmpty}
            />
          </label>

          <Button value="Back" onClick={this.handleCancel.bind(this)} />
          <Button className="right" value="Login" onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
      </div>
    );
  }
}



Login.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};