import React from "react";

import { Button } from "./lib/button";
import { validateEmpty, validatePrice } from "../util/validation";

function handleEdit(e) {
  e.preventDefault();
  this.setState({
    startEdit: true
  });
}

function handleView(e) {
  e.preventDefault();
  this.setState({startEdit: false});
}

function handleDelete(e) {
  e.preventDefault();
  const parent = this.props.parent;
  const grand = parent.props.parent;
  const id = this.props.id;
  fetch(`/api/warehouse/delete/${id}`, {
    method: "DELETE"
  }).then((res) => {
    return res.json();
  }).then((res) => {
    if (res.success) {
      this.setState({message: res.message});
      grand.setState({changed: true});
    }
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const id = this.props.id;
  const updateData = {
      itemName: this.refs.itemName.value.trim(),
      description: this.refs.description.value.trim(),
      price: this.refs.price.value.trim()
  };

  return fetch(`/api/warehouse/edit/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.success) {
        this.setState({startEdit: false});
      }
    });
    // .catch((err) => {
    //   parent.setState({error: err.message || "There's an error in our den, please try again later."});
    // });


}

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startEdit: false,
      itemName: props.itemName,
      description: props.description,
      price: props.price
    };
  }



  handleChangeName(event) {
    this.setState({itemName: event.target.value});
  }

  handleChangeDes(event) {
    this.setState({description: event.target.value});
  }

  handleChangePrice(event) {
    this.setState({price: event.target.value});
  }


  _renderEdit(display) {
    return (
      <form id={display} className="item edit">
        <img className="image" src={this.props.image}/>
          <input
            type="text"
            value={this.state.itemName}
            name="itemName"
            ref="itemName"
            onChange={this.handleChangeName.bind(this)}
          />

          <input
            type="text"
            value={this.state.description}
            name="description"
            ref="description"
            onChange={this.handleChangeDes.bind(this)}
          />

          <input
            type="text"
            value={this.state.price}
            name="price"
            ref="price"
            onChange={this.handleChangePrice.bind(this)}
          />

          <div className="hide">
            {this.props.id}
          </div>

          <div>
            <Button value="View" onClick={handleView.bind(this)}/>
            <Button value="Submit" onClick={handleSubmit.bind(this)}/><br/>
          </div>
      </form>
    );
  }

  _renderView(display) {
    return (
      <form id={display} className="item view">
        <img className="image" src={this.props.image}/>
        <h2 className="itemName">
          {this.state.itemName}
        </h2>

        <div>
          {this.state.description}
        </div>

        <div>
          {this.state.price}
        </div>

        <div className="hide">
          {this.props.id}
        </div>

        <div>
          <Button value="Delete" onClick={handleDelete.bind(this)}/>
          <Button value="Edit" onClick={handleEdit.bind(this)}/><br/>
        </div>
      </form>
    );
  }

  render() {
    const display = `${this.props.id}display`;
    return (
      <div>
          { this.state.startEdit ? this._renderEdit(display) : this._renderView(display) }
      </div>
    );
  }
}
