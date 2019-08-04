import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./helpers/tests-helper";
import config from "../config/config";

describe("Messages", () => {
  describe("PUT /api/additionals/messages", () => {
    it("should be able to unsets user's messages", done => {
      chai
        .request(app)
        .put("/api/additionals/messages")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.success.should.equal(true);
          done();
        });
    });

    it("should not able to unsets user's messages without token", done => {
      chai
        .request(app)
        .put("/api/additionals/messages")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/additionals/messages/{language}", () => {
    it("should not able to unsets user's messages without token", done => {
      chai
        .request(app)
        .get("/api/additionals/messages/EN")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.success.should.equal(true);
          res.body.should.have.property("messages");
          done();
        });
    });

    it("should not able to unsets user's messages without token", done => {
      chai
        .request(app)
        .put("/api/additionals/messages")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/additionals/messages/isMessage", () => {
    it("should be able to return boolean that message exists", done => {
      chai
        .request(app)
        .get("/api/additionals/messages/isMessage")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.should.have.property("isMessage");
          res.body.isMessage.should.to.be.an("boolean");
          done();
        });
    });

    it("should not able to return boolean that messages exists without token", done => {
      chai
        .request(app)
        .get("/api/additionals/messages/isMessage")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });
});
