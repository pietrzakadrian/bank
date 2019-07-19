import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./tests-helper";
import config from "../config/config";

describe("Notifications", () => {
  describe("PUT /​api​/additionals​/notifications", () => {
    it("should not able to return basic user's data without token", done => {
      chai
        .request(app)
        .put("/​api​/additionals​/notifications")
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });
  });
});
