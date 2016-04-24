import React from "react";

import { Button } from "./lib/button";
import { InputField } from "./lib/form";

export default class Signup extends React.Component {
  handleSubmit() {

  }

  render() {
    return (
      <div className="center_box background">
        <h3 className="center"> ʕ•̀ω•́ʔ  Hi, bear! Please register to build your own den!  ʕ•̫͡•ʕ•̫͡•ʔ•̫͡•ʔ•̫͡•ʕ</h3>
        <form onSubmit={this.handleSubmit}>
          <InputField placeholder="First Name" ref="firstNmae"/><br/>
          <InputField placeholder="Last Name" ref="lastName"/><br/>
          <InputField placeholder="Email" ref="email"/><br/>
          <InputField placeholder="Password" ref="password"/><br/>
          <InputField placeholder="Confirm Password" ref="password_confirm"/><br/>
          <Button value="Back" />
          <Button className="right" value="Sign up" />
        </form>
      </div>
    );
  }
}
