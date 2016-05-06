import React from "react";

import { Button } from "./lib/button";

export default class Item extends React.Component {

  handleDelete(e) {
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
    }).catch((err) => {
      this.setState({error: err.message || "There's an error in our den, please try again later."});
    });
  }

  render() {
    const display = this.props.id + 'display';
    return (
      <div>
        <form id={display} className="item">
          <img className="image" src={this.props.image}/>
          <h2 className="itemName">
            {this.props.itemName}
          </h2>

          <div>
            {this.props.description}
          </div>

          <div>
            ${this.props.price}
          </div>

          <div className="hide">
            {this.props.id}
          </div>

          <div>
            <Button value="Delete" onClick={this.handleDelete.bind(this)}/><br/>
          </div>
     
        </form>
      
      </div>
    );
  }
}