"use strict";

const path = require("path");
const uuid = require("uuid");
const React = require("react");
const ReactDomServer = require("react-dom/server");
const ReactRouter = require("react-router");

const User = require("../model/user");
const Item = require("../model/item");

function renderToStaticMarkup(renderProps) {
	return ReactDomServer.renderToStaticMarkup(
		React.createElement(ReactRouter.RouterContext, renderProps)
	);
}

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
			User.create(userData, (err, user) => {
				if (err) {
					return res.status(500).json({error: "DB_ERROR"});
				}
				
				res.json({success: true, firstName: user.firstName, userId: user.userId});
			});
		});
	});

	app.post("/api/login", (req, res) => {
		const loginData = {
			email: req.body.email,
			password: req.body.password
		};

		User.findOne({email: loginData.email}, (err, result) => {
			if (err) {
				return res.status(500).json({success: false, error: "DB_ERROR"});
			}

			if (!result) {
				return res.status(400).json({success: false, error: "USER_DOSE_NOT_EXIST"});
			}

			if (result.password !== loginData.password) {
				return res.status(400).json({success: false, error: "WRONG_PASSWORD"});
			}

			return res.json({success: true, firstName: result.firstName, userId: result.userId});
		});
	});

	app.post("/api/warehouse/add", (req, res) => {
		const itemData = {
			userId: req.body.userId,
			itemName: req.body.name,
			description: req.body.description,
			price: req.body.price,
			image: req.body.image
		};

		Item.create(itemData, (err, user) => {
			if (err) {
				return res.status(500).json({error: "DB_ERROR"});
			}
				
			res.json({success: true});
		});
	});

	app.get("/api/warehouse/:userId", (req, res) => {
		console.log("here");
		Item.find({userId: req.params.userId}, (err, result) => {
			if (err) {
				return res.status(500).json({success: false, error: "DB_ERROR"});
			}

			return res.json(result);
		})
	});

};
