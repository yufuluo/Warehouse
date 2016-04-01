"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 8000);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.listen(app.get("port"), () => {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});
