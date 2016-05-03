"use strict";

const path = require("path");
const uuid = require("uuid");

const User = require("../model/user");
const Item = require("../model/item");

const express = require("express");
const apiRouter = express.Router();

apiRouter.post("/signup", (req, res) => {
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

apiRouter.post("/login", (req, res) => {
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

apiRouter.post("/warehouse/add", (req, res) => {
  const itemData = {
    userId: req.body.userId,
    itemName: req.body.itemName,
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

apiRouter.get("/warehouse/:userId", (req, res) => {
  console.log("here");
  Item.find({userId: req.params.userId}, (err, result) => {
    if (err) {
      return res.status(500).json({success: false, error: "DB_ERROR"});
    }

    return res.json(result);
  })
});

module.exports = apiRouter;
