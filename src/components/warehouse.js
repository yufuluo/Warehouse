import React from "react";
import Validation from "react-validation";
import validator from "validator";

import { Button } from "./lib/button";

export default class Warehouse extends React.Component {
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
    if (!this.refs.form.isValidForm()) {
      throw "Invalid form";
    }

    const params = this.props.location.query;

    const data = {
      userId: params.id,
      itemName: this.refs.itemName.state.value.trim(),
      description: this.refs.description.state.value.trim(),
      price: this.refs.price.state.value.trim(),
      image: this.refs.image.state.value.trim()
    };

    fetch("/api/warehouse/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if (!res.success) {
        this.setState({error: "There's an error in our den, please try again later."});
      }
    }).catch((err) => {
      this.setState({error: "There's an error in our den, please try again later."});
    });
  }



  render() {
    return (
      <div className="center_box background">
        {this.state.error && <h3 className="center warning">{this.state.error}</h3>}
        <h3 className="center"> ʕ•̀ω•́ʔ Please input new items here. </h3>
        <Validation.Form ref="form">

          <label>
            Item Name
            <Validation.Input
              className="ui-input inputField" 
              type="text" 
              placeholder="Item name" 
              name="itemName" 
              ref="itemName" 
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
            Description
            <Validation.Input
              className="ui-input inputField" 
              type="description"
              placeholder="Description" 
              name="description" 
              ref="description" 
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
            Price
            <Validation.Input
              className="ui-input inputField" 
              type="text"
              placeholder="Price" 
              name="price" 
              ref="price" 
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
            Image URL
            <Validation.Input
              className="ui-input inputField" 
              type="text"
              placeholder="Image URL" 
              name="iamge" 
              ref="image" 
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

          <Button value="Submit" onClick={this.handleSubmit.bind(this)} />
        </Validation.Form>
      </div>
    );
  }
}