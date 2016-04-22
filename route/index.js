"use strict";

const uuid = require("uuid");

const User = require("../model/user");

module.exports = (app) => {
	app.post("/api/signup", (req, res) => {
		const userData = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		};

		User.findOne({email: userData.email}, (err, result) => {
			if (err) {
				return res.status(500).json({error: "DB_ERROR"});
			}

			if (result) {
				return res.status(400).json({error: "USER_EXIST"});
			}

			userData.userId = uuid.v4();
			new User(userData).save()
				.then((result) => {
					res.json({success: true});
				});
		});
	});
};
