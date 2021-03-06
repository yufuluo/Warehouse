import React from "react";
import Item from "./item";

export default class ItemList extends React.Component {


  render() {
    const itemNodes = this.props.data.map((item, index) => {
      return (
        <Item id={item.id} itemName={item.itemName} description={item.description}
          price={item.price} image={item.image} parent={this} key={index}/>
      );
    });

    return (
      <div className="itemList">
        {itemNodes}
      </div>
    );
  }
}
