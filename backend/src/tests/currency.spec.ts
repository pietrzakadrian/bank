import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();
import { app, authToken } from "./helpers/tests-helper";
import config from "../config/config";

const currenciesExchangeRates = {
  rates: {
    EUR: 0.2347638276,
    USD: 0.263311109
  },
  base: "PLN",
  date: "2019-07-18"
};

describe("Currency", () => {
  describe("GET /api/currency", () => {
    it("should be able to return currencies data", done => {
      chai
        .request(app)
        .get("/api/currency")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("currency");
          done();
        });
    });
  });

  describe("PATCH /api/currency", () => {
    it("should be able to updates currencies data", done => {
      const transformExchangeRateSyncDate = Object.entries(
        currenciesExchangeRates.rates
      ).map(([name, exchangeRate]) => ({
        name,
        exchangeRate,
        exchangeRateSyncDate: currenciesExchangeRates.date
      }));

      chai
        .request(app)
        .patch("/api/currency")
        .auth(`${config.admin.login}`, `${config.admin.password}`)
        .send(transformExchangeRateSyncDate)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should not able to updates currencies data without token", done => {
      const transformExchangeRateSyncDate = Object.entries(
        currenciesExchangeRates.rates
      ).map(([name, exchangeRate]) => ({
        name,
        exchangeRate,
        exchangeRateSyncDate: currenciesExchangeRates.date
      }));

      chai
        .request(app)
        .patch("/api/currency")
        .send(transformExchangeRateSyncDate)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
