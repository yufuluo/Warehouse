"use strict";

const loginUri = require("../../config/default").basePath.ui;

module.exports = function errorHandler(err, req, res, next) {
  if (err.message === "LOGIN") {
    return res.redirect(loginUri);
  }

  next();
};
