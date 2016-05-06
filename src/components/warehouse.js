import React from "react";
import ItemList from "./item_list.js";
import ItemForm from "./item_form.js";

export default class Warehouse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: ""
    };
  }

  loadItems() {
    const params = this.props.location.query;
    fetch(`/api/warehouse/${params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({data});
    }).catch((err) => {
      this.setState({error: err.message || "There's an error in our den, please try again later."});
    });
  }

  handleSubmit(item) {
    const items = this.state.data;
    const newItems = items.concat([item]);
    this.setState({data: newItems});

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
      this.setState({data});
    }).catch((err) => {
      this.setState({error: err.message || "There's an error in our den, please try again later."});
    });
  } 

  componentDidMount() {
      this.loadItems();
  }

  render() {
    return (
          <div className="Warehouse">
              <ItemList data={this.state.data}/>
              <ItemForm onSubmit={this.handleSubmit.bind(this)}/>
          </div>
      );
  }
}