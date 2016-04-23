"use strict";

const uuid = require("uuid");
const React = require("react");
const ReactDomServer = require("react-dom/server");
const ReactRouter = require("react-router");

const User = require("../model/user");

function renderToStaticMarkup(renderProps) {
	return ReactDomServer.renderToStaticMarkup(
		React.createElement(ReactRouter.RouterContext, renderProps)
	);
}

module.exports = (app) => {
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'public/index.html'));
	});

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
