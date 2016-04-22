"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

require("mongoose").connect("mongodb://localhost:27017/test");

app.set("port", process.env.PORT || 8000);

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/dist", express.static(path.join(__dirname, "dist")));

require("./route")(app);

app.listen(app.get("port"), () => {
  console.log("Server started: http://localhost:" + app.get("port") + "/");
});
