import React from "react";

export default class Signup extends React.Component {
  handleSubmit() {

  }

  render() {
    return (
      <div>
        <form className="Signup" onSubmit={this.handleSubmit}>
          <input className="inputField" type="text" placeholder="First Name" ref="firstNmae"/><br/>
          <input className="inputField" type="text" placeholder="Last Name" ref="lastName"/><br/>
          <input className="inputField" type="text" placeholder="Email" ref="email"/><br/>
          <input className="inputField" type="text" placeholder="Password" ref="password"/><br/>
          <input className="button" type="submit" value="signup"/>
        </form>
      </div>
    );
  }
}
