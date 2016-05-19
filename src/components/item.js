import React from "react";

import { Button } from "./lib/button";

function handleDelete(e) {
  e.preventDefault();
  const id = this.props.id;
  fetch(`/api/warehouse/delete/${id}`, {
    method: "DELETE"
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.success) {
      this.setState({message: res.message});
    }
  });
}

export default (props) => {
  const display = props.id + 'display';
  return (
    <div>
      <form id={display} className="item">
        <img className="image" src={props.image}/>
        <h2 className="itemName">
          {props.itemName}
        </h2>

        <div>
          {props.description}
        </div>

        <div>
          {props.price}
        </div>

        <div className="hide">
          {props.id}
        </div>

        <div>
          <Button value="Delete" onClick={handleDelete}/><br/>
        </div>
      </form>
    </div>
  );
};
