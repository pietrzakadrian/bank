import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./tests-helper";
import config from "../config/config";

const userToLogin = {
  login: config.admin.login,
  password: `${config.admin.password}`
};

describe("Bills", () => {
  describe("GET /api/bills", () => {
    it("should be able to return bills user's data", done => {
      chai
        .request(app)
        .get("/api/bills")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("accountBill");
          res.body.should.have.property("availableFunds");
          res.body.should.have.property("currency");
          res.body.should.have.property("additionals");
          done();
        });
    });

    it("should not able to return bills user's data without token", done => {
      chai
        .request(app)
        .get("/api/bills")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });
});
