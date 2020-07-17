import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./helpers/tests-helper";
import config from "../config/config";

describe("Users", () => {
  describe("GET /api/users", () => {
    it("should be able to return basic user's data", done => {
      chai
        .request(app)
        .get("/api/users")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("surname");
          res.body.should.have.property("email");
          res.body.should.have.property("lastSuccessfulLoggedDate");
          res.body.should.have.property("lastPresentLoggedDate");
          res.body.should.have.property("lastFailedLoggedDate");
          done();
        });
    });

    it("should not able to return basic user's data without token", done => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("PATCH /api/users", () => {
    it("should be able to updates basic user's data", done => {
      chai
        .request(app)
        .patch("/api/users")
        .set("Authorization", authToken)
        .send({ currencyId: 2 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.equal(true);
          done();
        });
    });

    it("should not able to updates basic user's data without token", done => {
      chai
        .request(app)
        .patch("/api/users")
        .send({ currencyId: 3 })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/users/{login}/isLogin", () => {
    it("should be able to return boolean that login exists", done => {
      chai
        .request(app)
        .get(`/api/users/${config.admin.login}/isLogin`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.isLogin.should.equal(true);
          done();
        });
    });

    it("should be able to return false if login doesn't exist", done => {
      chai
        .request(app)
        .get(`/api/users/111132134/isLogin`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.isLogin.should.equal(false);
          res.body.isLogin.should.to.be.an("boolean");
          done();
        });
    });
  });

  describe("GET /api/users/{email}/isEmail", () => {
    it("should be able to return boolean that email exists", done => {
      chai
        .request(app)
        .get(`/api/users/${config.admin.email}/isEmail`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.isEmail.should.equal(true);
          res.body.isEmail.should.to.be.an("boolean");
          done();
        });
    });

    it("should be able to return false if email doesn't exist", done => {
      chai
        .request(app)
        .get(`/api/users/112@122.com/isEmail`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.isEmail.should.equal(false);
          done();
        });
    });
  });
});
