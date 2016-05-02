import React from "react";
import { Router, browserHistory } from "react-router";
import Validation from "react-validation";
import validator from "validator";

import { Button } from "./lib/button";

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
    if (!this.refs.form.isValidForm()) {
      throw "Invalid form";
    }

    const data = {
      email: this.refs.email.state.value.trim(),
      password: this.refs.password.state.value.trim()
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
        browserHistory.push(`/warehouse?name=${res.firstName}&id=${res.userId}`);
      } else if (res.error === "USER_DOSE_NOT_EXIST") {
        this.setState({error: "Account with this email address does not exist."});
      } else if (res.error === "WRONG_PASSWORD") {
        this.setState({error: "Incorrect password."});
      } else {
        this.setState({error: "There's an error in our den, please try again later."});
      }
    }).catch((err) => {
      this.setState({error: "There's an error in our den, please try again later."});
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.context.router.goBack();
  }

  render() {
    return (
      <div className="center_box background">
        {this.state.error && <h3 className="center warning">{this.state.error}</h3>}
        <h3 className="center"> ʕ•̀ω•́ʔ  Welcome back! Your BearHouse is waiting for you!  ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ</h3>
        <Validation.Form ref="form">

          <label>
            Email
            <Validation.Input
              className="ui-input inputField" 
              type="text" 
              placeholder="Email" 
              name="email" 
              ref="email" 
              invalidClassName="ui-error"
              value=""
              validations={[
                {
                  rule: "isRequired",
                  errorMessage: "Mandatory field"
                },
                {
                  rule: "isEmail",
                  errorMessage: "Invalid Email address"
                }
              ]}
            />
          </label>

          <label>
            Password
            <Validation.Input
              className="ui-input inputField" 
              type="password"
              placeholder="Password" 
              name="password" 
              ref="password" 
              invalidClassName="ui-error"
              value=""
              validations={[
                {
                  rule: "isRequired",
                  errorMessage: "Mandatory field"
                }
              ]}
            />
          </label>

          <Button value="Back" onClick={this.handleCancel.bind(this)} />
          <Button className="right" value="Login" onClick={this.handleSubmit.bind(this)} />
        </Validation.Form>
      </div>
    );
  }
}



Login.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};