import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

import { app } from "./tests-helper";

chai.use(chaiHttp);
const should = chai.should();

describe("API Ready", () => {
  it("should ensure that API is up & running", done => {
    chai
      .request(app)
      .get("/api-docs")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
