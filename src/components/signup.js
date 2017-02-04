import React from "react";
import { Router, browserHistory } from "react-router";
import { validateEmail, validateEmpty, validateName } from "../util/validation";

import { Button } from "./lib/button";

import fullPath from "../util/fullPath";
import bear from "../pics/bear-paw.svg";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      firstName: this.refs.firstName.value.trim(),
      lastName: this.refs.lastName.value.trim(),
      email: this.refs.email.value.trim(),
      password: this.refs.password.value
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
    if (this.refs.confirm_password.value !== this.refs.password.value) {
      e.target.classList.add("ui-error");
      e.target.classList.add("ui-input_state_invalid");
    } else {
      e.target.classList.remove("ui-error");
      e.target.classList.remove("ui-input_state_invalid");
    }
  }

  render() {
    return (
      <div className="bgcolor">
      <div className="center_box signup background">
        <img className="login_img_left" src={bear} alt="login_bear"/>
        {this.state.error && <h3 className="center warning">{this.state.error}</h3>}
        <img className="login_img_right" src={bear} alt="login_bear"/>
        <h3 className="center"> Please register to build your own bear den</h3>
        <h4></h4>
        <form refs="form">
          <label>
            First name
            <input
              className="ui-input inputField"
              type="text"
              placeholder="First Name"
              ref="firstName"
              name="firstName"
              invalidClassName="ui-error"
              onChange={validateName}
            />
          </label>

          <label>
            Last name
            <input
              className="ui-input inputField" 
              type="text" 
              placeholder="Last Name" 
              name="lastName" 
              ref="lastName" 
              invalidClassName="ui-error"
              onChange={validateName}
            />
          </label>

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
              id="password"
              type="password"
              placeholder="Password" 
              name="password" 
              ref="password" 
              invalidClassName="ui-error"
              onChange={validateEmpty}
            />
          </label>

         <label>
            Confirm password
            <input
              className="ui-input inputField"
              type="password"
              placeholder="Confirm password" 
              name="confirm_password" 
              ref="confirm_password" 
              invalidClassName="ui-error"
              onChange={this.validatePassword.bind(this)}
            />
          </label>

          <Button value="Back" onClick={this.handleCancel.bind(this)} />
          <Button className="right button1" value="Sign up" onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
      </div>
    );
  }
}

Signup.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};
