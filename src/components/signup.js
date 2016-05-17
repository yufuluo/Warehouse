import React from "react";
import { Router, browserHistory } from "react-router";
import Validation from "react-validation";
import validator from "validator";

import { Button } from "./lib/button";

import fullPath from "../util/fullPath";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.refs.form.isValidForm()) {
      this.setState({error: "Please verify your inputs."});
      return;
    }

    const data = {
      firstName: this.refs.firstName.state.value.trim(),
      lastName: this.refs.lastName.state.value.trim(),
      email: this.refs.email.state.value.trim(),
      password: this.refs.password.state.value
    };

    return fetch("/api/signup", {
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
      } else if (res.error === "USER_EXIST") {
        this.setState({error: "An account already exists with this email address."});
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

  validatePassword(e) {
    e.preventDefault();
    if (this.refs.confirm_password.state.value !== this.refs.password.state.value) {
      e.target.classList.add("ui-error");
      e.target.classList.add("ui-input_state_invalid");
    } else {
      e.target.classList.remove("ui-error");
      e.target.classList.remove("ui-input_state_invalid");
    }
  }

  render() {
    return (
      <div className="center_box background">
        {this.state.error && <h3 className="center warning">{this.state.error}</h3>}
        <h3 className="center"> ʕ•̀ω•́ʔ  Hi, bear! Please register to build your own den!  ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ</h3>
        <Validation.Form ref="form">
          <label>
            First name
            <Validation.Input
              className="ui-input inputField"
              type="text"
              placeholder="First Name"
              ref="firstName"
              name="firstName"
              invalidClassName="ui-error"
              value=""
              validations={[
                {
                  rule: "isRequired",
                  errorMessage: "Mandatory field"
                },
                {
                  rule: "isAlpha",
                  errorMessage: "Invalid first name"
                }
              ]}
            />
          </label>

          <label>
            Last name
            <Validation.Input
              className="ui-input inputField" 
              type="text" 
              placeholder="Last Name" 
              name="lastName" 
              ref="lastName" 
              invalidClassName="ui-error"
              value=""
              validations={[
                {
                  rule: "isRequired",
                  errorMessage: "Mandatory field"
                },
                {
                  rule: "isAlpha",
                  errorMessage: "Invalid last name"
                }
              ]}
            />
          </label>

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
              id="password"
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

         <label>
            Confirm password
            <Validation.Input
              className="ui-input inputField"
              type="password"
              placeholder="Confirm password" 
              name="confirm_password" 
              ref="confirm_password" 
              invalidClassName="ui-error"
              value=""
              validations={[
                {
                  rule: "isRequired",
                  errorMessage: "Mandatory field"
                }
              ]}
              onChange={this.validatePassword.bind(this)}
            />
          </label>

          <Button value="Back" onClick={this.handleCancel.bind(this)} />
          <Button className="right button1" value="Sign up" onClick={this.handleSubmit.bind(this)} />
        </Validation.Form>
      </div>
    );
  }
}

Signup.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};
