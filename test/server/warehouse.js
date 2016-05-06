"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const superagent = require("superagent");
const apiRouter = require("../../route/api");
const chai = require("chai");
const expect = chai.expect;

describe("test warehouse", () => {
  let server;
  let db;

  before(() => {
    db = require('mongoose').connect("mongodb://localhost:27017/test");

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(apiRouter);
    server = app.listen(4000);
  });

  after(() => {
    server.close();
    db.disconnect();
  });

  it("apiRouter should exist", (done) => {
    expect(apiRouter).to.exist;
    done();
  });

  it("should be able to get item", (done) => {
    superagent
      .get("localhost:4000/warehouse/01077fac-1a94-47f3-b329-45a7376ac52a")
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body).to.exist;
        done();
      });
  });

  //it("should return DB error", (done) => {
  //  superagent
  //    .get("localhost:4000/warehouse/01077fac-1a94-47f3-b329-45a7376ac52b")
  //    .end((err, res) => {
  //      expect(err.status).to.equal(400);
  //      expect(res.body.error).to.equal("DB_ERROR");
  //      done();
  //    });
  //});

  it("should be able to post item", (done) => {
    superagent
      .post("localhost:4000/warehouse/add")
      .send({
        userId: "01077fac-1a94-47f3-b329-45a7376ac52a",
        itemName: "Rilakkuma",
        description: "Lovely little bear",
        price: 3000000,
        image: "https://i.ytimg.com/vi/NtGHoy_5MYc/maxresdefault.jpg"
      })
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.success).to.be.true;
        done();
      });
  });

  //it("should return DB error too", (done) => {
  //  superagent
  //    .post("localhost:4000/warehouse/add")
  //    .send({
  //      userId: "01077fac-1a94-47f3-b329-45a7376ac52b",
  //      itemName: "Rilakkuma",
  //      description: "Lovely little bear",
  //      price: 3000000,
  //      image: "https://i.ytimg.com/vi/NtGHoy_5MYc/maxresdefault.jpg"
  //    })
  //    .end((err, res) => {
  //      expect(err.status).to.equal(400);
  //      expect(res.body.error).to.equal("DB_ERROR");
  //      done();
  //    });
  //});
});
