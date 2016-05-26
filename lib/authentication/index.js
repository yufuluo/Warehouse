"use strict";

const jwt = require("../jwt");

const authLevel = {
  edit: [
    "/api/warehouse/delete",
    "/api/warehouse/add"
  ],
  view: [
    "/api/warehouse"
  ]
};

module.exports = function authenticate(req, res, next) {
  const viewCookie = req.cookies.viewAuth;
  const editCookie = req.cookies.editAuth;

  let verify = false;
  authLevel.edit.some((uri) => {
    if (req.url.indexOf(uri) === 0) {
      return verify = true;
    }
  });

  if (verify) {
    return jwt.verify(editCookie, "katemiu@gmail.com")
      .then((result) => {
        if (result) {
          return next();
        } else {
          return next(new Error("LOGIN"));
        }
      })
      .catch(() => {
        return next(new Error("LOGIN"));
      });
  }

  authLevel.view.some((uri) => {
    if (req.url.indexOf(uri) === 0) {
      return verify = true;
    }
  });

  if (verify) {
    return jwt.verify(viewCookie, "katemiu@gmail.com")
      .then((result) => {
        if (result) {
          return next();
        } else {
          return next(new Error("LOGIN"));
        }
      })
      .catch(() => {
        return next(new Error("LOGIN"));
      });
  }

  return next();
};
