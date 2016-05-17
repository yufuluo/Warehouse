"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  userId: String,
  itemName: String,
  description: String,
  price: Number,
  image: String
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
