import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./helpers/tests-helper";

describe("Logout", () => {
  describe("PUT /api/auth/logout", () => {
    it("should be able to logout a user", done => {
      chai
        .request(app)
        .put("/api/auth/logout")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          res.body.should.have.property("success");
          done();
        });
    });

    it("should not able to logout a user without token", done => {
      chai
        .request(app)
        .put("/api/auth/logout")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });
});
