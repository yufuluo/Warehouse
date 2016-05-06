import React from "react";

export default class Item extends React.Component {
  onChange(state) {
    this.setState(state);
  }

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

          // <div>
          //   <input className="button" type="button" value="Delete" onClick={this.handleDelete}/><br/>
          //   <input className="button" type="button" value="Edit" onClick={this.handleEdit}/>
          // </div>
        </form>

        // <form id={edit} className="hide">
        //   <input className="inputField" type="text" value={this.props.itemName} ref="name"/><br/>
        //   <input className="button" type="button" value="Update" onClick={this.handleUpdate}/><br/>
        // </form>
    </div>
  );
  }
}