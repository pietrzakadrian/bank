import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app } from "./helpers/tests-helper";
import config from "../config/config";

const userToLogin = {
  login: config.admin.login,
  password: `${config.admin.password}`
};

describe("Login", () => {
  describe("POST /api/auth/login", () => {
    it("should not able to register a user without correctly password", done => {
      const tmpUser = Object.assign({}, userToLogin);
      delete tmpUser.password;
      tmpUser.password = `12${config.admin.password}21`;

      chai
        .request(app)
        .post("/api/auth/login")
        .send(tmpUser)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should be able to login with correct credentials & get token", done => {
      chai
        .request(app)
        .post("/api/auth/login")
        .send(userToLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.success.should.equal(true);
          res.body.should.have.property("token");
          done();
        });
    });
  });
});
