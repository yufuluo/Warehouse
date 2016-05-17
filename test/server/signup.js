"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const superagent = require("superagent");
const apiRouter = require("../../lib/route/api");
const chai = require("chai");
const expect = chai.expect;

describe("test signup", () => {
  let server;
  let db;

  before(() => {
    db = require("mongoose").connect("mongodb://localhost:27017/test");

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

  it("should be able to signup", (done) => {
    superagent
      .post("localhost:4000/signup")
      .send({
        firstName: "First",
        lastName: "Last",
        email: `${Math.random()}@gmail.com`,
        password: "111222"
      })
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.success).to.be.true;
        expect(res.body.firstName).to.equal("First");
        expect(res.body.userId).to.exist;
        done();
      });
  });

  it("should return user exist", (done) => {
    superagent
      .post("localhost:4000/signup")
      .send({
        firstName: "First",
        lastName: "Last",
        email: "first@gmail.com",
        password: "111222"
      })
      .end((err, res) => {
        expect(err.status).to.equal(400);
        expect(res.body.success).not.to.be.true;
        expect(res.body.error).to.equal("USER_EXIST");
        done();
      });
  });

  //it("should return DB error", (done) => {
  //  superagent
  //    .post("localhost:4000/login")
  //    .send({
  //      email: "notexist@notexist.com",
  //      password: "notexist"
  //    })
  //    .end((err, res) => {
  //      expect(err.status).to.equal(400);
  //      expect(res.body.success).to.be.false;
  //      expect(res.body.error).to.equal("USER_DOSE_NOT_EXIST");
  //      done();
  //    });
  //});
});
