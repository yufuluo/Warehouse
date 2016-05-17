"use strict";

const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const createToken = Promise.promisify(jwt.sign);
const verifyToken = Promise.promisify(jwt.verify);

const jwtConfig = require("../../config/default").jwt;
const secret = jwtConfig.secret;
const viewExpires = jwtConfig.expires.view;
const editExpires = jwtConfig.expires.edit;

function create(email) {
  const viewTokenPromise = createToken({email}, secret, {expiresIn: viewExpires});
  const editTokenPromise = createToken({email}, secret, {expiresIn: editExpires});

  return Promise.all([viewTokenPromise, editTokenPromise])
    .spread((viewToken, editToken) => {
      return {
        view: {
          token: viewToken,
          expires: viewExpires
        },
        edit: {
          token: editToken,
          expires: editExpires
        }
      };
    });
}

function verify(token, email) {
  return verifyToken(token, secret)
    .then((decoded) => {
     return decoded.email === email;
    });
}

module.exports = {
  create,
  verify
};