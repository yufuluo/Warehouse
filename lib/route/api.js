"use strict";

const path = require("path");
const uuid = require("uuid");

const User = require("../model/user");
const Item = require("../model/item");

const express = require("express");
const apiRouter = express.Router();

const jwt = require("../jwt");

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

  function setCookie(maxAttempts) {
    maxAttempts -= 1;
    return jwt.create(loginData.email)
      .then((tokens) => {
        const viewAuthExpires = new Date(Date.now() + tokens.view.expires * 1000);
        const editAuthExpires = new Date(Date.now() + tokens.edit.expires * 1000);
        res.cookie("viewAuth", tokens.view.token, {expires: viewAuthExpires, path: "/"});
        res.cookie("editAuth", tokens.edit.token, {expires: editAuthExpires, path: "/"});
      })
      .catch((err) => {
        if (maxAttempts > 0) {
          return setCookie(maxAttempts);
        } else {
          return res.status(500).json({err: "UNABLE_TO_CREATE_TOKEN"});
        }
      });
  }

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

    return setCookie(3)
      .then(() => {
        return res.json({success: true, firstName: result.firstName, userId: result.userId});
      });
  });
});


apiRouter.get("/logout", (req, res) => {
  res.clearCookie("viewAuth", {path: "/"});
  res.clearCookie("editAuth", {path: "/"});

  return res.json({success: true});
});


apiRouter.post("/warehouse/add", (req, res) => {
  const itemData = {
    userId: req.body.userId,
    itemName: req.body.itemName,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  };

  Item.create(itemData, (err, result) => {
    if (err) {
      return res.status(500).json({error: "DB_ERROR"});
    }

    res.json({success: true, id: result._id});
  });
});

apiRouter.delete("/warehouse/delete/:itemId", (req, res) => {

  Item.findByIdAndRemove(req.params.itemId, (err, result) => {
    if (err) {
      return res.status(500).json({success: false, error: "DB_ERROR"});
    }

    return res.json({success: true, message: "Item removed"});
  })
});

apiRouter.get("/warehouse/:userId", (req, res) => {
  Item.find({userId: req.params.userId}, (err, result) => {
    if (err) {
      return res.status(500).json({success: false, error: "DB_ERROR"});
    }

    const uiData = [];
    result.map((item) => {
      const data = {
        id: item._id,
        itemName: item.itemName,
        description: item.description,
        price: item.price,
        image: item.image
      }
      uiData.push(data);
    });

    return res.json(uiData);
  })
});

module.exports = apiRouter;
