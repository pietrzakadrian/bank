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

  describe("GET /api/bills{accountBill}/search", () => {
    it("should be able to return array", done => {
      chai
        .request(app)
        .get(`/api/bills/${1}/search`)
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("bills");
          done();
        });
    });

    it("should not able to return array without token", done => {
      chai
        .request(app)
        .get(`/api/bills/${1}/search`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/bills/{accountBill}/isAccountBill", () => {
    it("should be able to return boolean that accountBill exists", done => {
      const accountBill: string = "30690220109793334668395598";

      chai
        .request(app)
        .get(`/api/bills/${accountBill}/isAccountBill`)
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("isAccountBill");
          res.body.isAccountBill.should.to.be.an("boolean");
          done();
        });
    });

    it("should not able to return boolean that accountBill exists without token", done => {
      const accountBill: string = "30690220109793334668395598";

      chai
        .request(app)
        .get(`/api/bills/${accountBill}/isAccountBill`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/bills/{amountMoney}/isAmountMoney", () => {
    it("should be able to return boolean that accountBill exists", done => {
      const amountMoney: number = 10.2;

      chai
        .request(app)
        .get(`/api/bills/${amountMoney}/isAmountMoney`)
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("isAmountMoney");
          res.body.isAmountMoney.should.to.be.an("boolean");
          done();
        });
    });

    it("should not able to return boolean that accountBill exists without token", done => {
      const amountMoney: number = 10.2;
      chai
        .request(app)
        .get(`/api/bills/${amountMoney}/isAmountMoney`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });
});
