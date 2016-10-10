import React from "react";

import { validateEmpty, validatePrice, validateURL } from "../util/validation";

import { Button } from "./lib/button";

export default class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      itemName: "",
      description: "",
      price: "",
      image: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    //if (!this.refs.form.isValidForm()) {
    //  throw "Invalid form";
    //}

    const itemData = {
      userId: this.props.userId,
      itemName: this.refs.itemName.value.trim(),
      description: this.refs.description.value.trim(),
      price: this.refs.price.value.trim(),
      image: this.refs.image.value.trim()
    };

    const parent = this.props.parent;

    const items = this.props.data;

    return fetch("/api/warehouse/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemData)
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.success) {
        itemData.id = data.id;
        const newItems = items.concat([itemData]);
        parent.setState({data: newItems});
      }
    }).catch((err) => {
      parent.setState({error: err.message || "There's an error in our den, please try again later."});
    });
  }

  render() {
    return (
      <div className="form_box background">
        <h3 className="center"> ʕ•̀ω•́ʔ Please input new items here. </h3>
        <form ref="form">

          <label>
            Item Name
            <input
              className="ui-input inputField" 
              type="text" 
              placeholder="Item name" 
              name="itemName" 
              ref="itemName" 
              invalidClassName="ui-error"
              onChange={validateEmpty}
            />
          </label>

          <label>
            Description
            <input
              className="ui-input inputField" 
              type="description"
              placeholder="Description" 
              name="description" 
              ref="description" 
              invalidClassName="ui-error"
              onChange={validateEmpty}
            />
          </label>

          <label>
            Price
            <input
              className="ui-input inputField" 
              type="text"
              placeholder="Price" 
              name="price" 
              ref="price" 
              invalidClassName="ui-error"
              onChange={validatePrice}
            />
          </label>

          <label>
            Image URL
            <input
              className="ui-input inputField" 
              type="text"
              placeholder="Image URL" 
              name="iamge" 
              ref="image" 
              invalidClassName="ui-error"
              onChange={validateURL}
            />
          </label>

          <Button className="button1" value="Submit" onClick={this.handleSubmit.bind(this)} />
        </form>
      </div>
    );
  }
}