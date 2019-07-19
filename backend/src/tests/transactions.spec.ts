import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./helpers/tests-helper";
import config from "../config/config";

describe("Transactions", () => {
  describe("GET /api/transactions/{offset}", () => {
    it("should be able to return user's transactions", done => {
      chai
        .request(app)
        .get("/api/transactions")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("transactions");
          done();
        });
    });
  });
});
