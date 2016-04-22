"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	userId: String,
	email: String,
	password: String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
