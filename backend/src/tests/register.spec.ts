import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app } from "./helpers/tests-helper";

const userToRegister = {
  name: "Adrian",
  surname: "Pietrzak",
  email: "adrian@pietrzak.com",
  login: 865321352216,
  password: "1234",
  currencyId: 2
};

describe("Register", () => {
  describe("POST /api/auth/register", () => {
    it("should not able to register a user without name in body", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.name;
      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should not able to register a user without surname in body", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.surname;
      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should not able to register a user with the same email address", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.email;
      tmpUser.email = "bank@application.com";

      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should not able to register a user without email in body", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.email;
      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should not able to register a user with the same login", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.login;
      tmpUser.login = 1234;

      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should not able to register a user without login in body", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.login;
      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should not able to register a user without password in body", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.password;
      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should not able to register a user without password in body", done => {
      const tmpUser = Object.assign({}, userToRegister);
      delete tmpUser.password;
      chai
        .request(app)
        .post("/api/auth/register")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should be able to register a user with correct details", done => {
      chai
        .request(app)
        .post("/api/auth/register")
        .send(userToRegister)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          done();
        });
    });
  });
});
