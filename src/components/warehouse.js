import React from "react";
import ItemList from "./item_list.js";
import ItemForm from "./item_form.js";

export default class Warehouse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userId: "",
      error: ""
    };
  }

  loadItems() {
    const params = this.props.location.query;
    this.state.userId = params.id;
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

  componentDidMount() {
      this.loadItems();
  }

  render() {
    return (
          <div className="Warehouse">
              <ItemList data={this.state.data}/>
              <ItemForm data={this.state.data} userId={this.state.userId} parent={this} />
          </div>
      );
  }
}