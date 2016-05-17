"use strict";

const path = require("path");

const express = require("express");
const uiRouter = express.Router();

uiRouter.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../", "build/index.html"));
});

module.exports = uiRouter;
