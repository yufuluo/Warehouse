"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const history = require("history");
const webpack = require("webpack");

const config = require("./webpack.config");

const app = express();

const compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

require("mongoose").connect("mongodb://localhost:27017/test");

app.set("port", process.env.PORT || 8000);

app.use("/", express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

require("./route")(app);

app.listen(app.get("port"), () => {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});
