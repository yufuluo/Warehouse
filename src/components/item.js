import React from "react";

export default class Item extends React.Component {

  render() {
    const display = this.props.id + 'display';
    // const edit = this.props.id + 'edit';
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

          
        </form>

       
    </div>
  );
  }
}