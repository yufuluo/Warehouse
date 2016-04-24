import React from "react";

export const InputField = (props) => (
  <input className="inputField" type="text" placeholder={props.placeholder} ref={props.ref} />
);
