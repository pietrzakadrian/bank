import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./helpers/tests-helper";
import config from "../config/config";

describe("Notifications", () => {
  describe("PUT /​api​/additionals​/notifications", () => {
    it("should be able to unsets user's notifications", done => {
      chai
        .request(app)
        .put("/api/additionals/notifications")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.success.should.equal(true);
          done();
        });
    });

    it("should not able to unsets user's notifications without token", done => {
      chai
        .request(app)
        .put("/api/additionals/notifications")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /​api​/additionals​/notifications/{offset}", () => {
    it("should not able to unsets user's notifications without token", done => {
      chai
        .request(app)
        .get("/api/additionals/notifications/5")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.success.should.equal(true);
          res.body.should.have.property("notifications");
          done();
        });
    });

    it("should not able to unsets user's notifications without token", done => {
      chai
        .request(app)
        .put("/api/additionals/notifications")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /​api​/additionals​/notifications/isNotification", () => {
    it("should be able to return boolean that notification exists", done => {
      chai
        .request(app)
        .get("/api/additionals/notifications/isNotification")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.should.have.property("isNotification");
          res.body.isNotification.should.to.be.an("boolean");
          done();
        });
    });
  });
});
