import "mocha";

import chai from "chai";
import chaiHttp = require("chai-http");

chai.use(chaiHttp);
const should = chai.should();

import { app, authToken } from "./helpers/tests-helper";
import config from "../config/config";

import { BillService } from "../services/bills.service";
import { UserService } from "../services/users.service";
import { CurrencyService } from "../services/currency.service";
import { TransactionService } from "../services/transactions.service";

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

    it("should not able to return user's transactions without token", done => {
      chai
        .request(app)
        .get("/api/transactions")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/transactions/sender", () => {
    it("should be able to return user's as sender transactions", done => {
      chai
        .request(app)
        .get("/api/transactions/sender")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("senderTransactions");
          res.body.senderTransactions.should.to.be.an("array");
          done();
        });
    });

    it("should not able to return user's as sender transactions without token", done => {
      chai
        .request(app)
        .get("/api/transactions/sender")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/transactions/recipient", () => {
    it("should be able to return user's as recipient transactions", done => {
      chai
        .request(app)
        .get("/api/transactions/recipient")
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("recipientTransactions");
          res.body.recipientTransactions.should.to.be.an("array");
          done();
        });
    });

    it("should not able to return user's as recipient transactions without token", done => {
      chai
        .request(app)
        .get("/api/transactions/recipient")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("GET /api/transactions/{id}/key", () => {
    it("should be able to return user's authorization key for last transaction with recipientId", done => {
      const recipientId: number = 1;

      chai
        .request(app)
        .get(`/api/transactions/${recipientId}/key`)
        .set("Authorization", authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          res.body.should.be.a("object");
          res.body.should.have.property("authorizationKey");
          res.body.authorizationKey.should.to.be.an("string");
          done();
        });
    });

    it("should not able to return user's authorization key for last transaction without token", done => {
      const recipientId: number = 1;

      chai
        .request(app)
        .get(`/api/transactions/${recipientId}/key`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe("POST /api/transactions/create", () => {
    it("should be able to return create new transaction", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const currencyService = new CurrencyService();
      const sender = await userService.getByLogin(config.author.login);
      const recipient = await userService.getByLogin(config.admin.login);
      const recipientBill = await billService.getByUser(recipient);
      const recipientAccountBill = recipientBill.accountBill;
      const currency = await currencyService.getById(1);
      await billService.addAmountMoney(230, sender, currency);

      const transferToCreate = {
        accountBill: recipientAccountBill,
        amountMoney: 3,
        transferTitle: "test"
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/create")
        .set("Authorization", authToken)
        .send(transferToCreate);

      response.should.have.status(200);
    });

    it("should not able to return create new transaction without token", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const currencyService = new CurrencyService();
      const sender = await userService.getByLogin(config.admin.login);
      const recipient = await userService.getById(2);
      const recipientBill = await billService.getByUser(recipient);
      const recipientAccountBill = recipientBill.accountBill;
      const currency = await currencyService.getById(1);
      await billService.addAmountMoney(23, sender, currency);

      const transferToCreate = {
        accountBill: recipientAccountBill,
        amountMoney: 10.2,
        transferTitle: "test"
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/create")
        .send(transferToCreate);

      response.should.have.status(401);
    });

    it("should not able to return create new transaction when sender doesn't have necessary amount of money", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const currencyService = new CurrencyService();
      const sender = await userService.getByLogin(config.admin.login);
      const recipient = await userService.getById(2);
      const recipientBill = await billService.getByUser(recipient);
      const recipientAccountBill = recipientBill.accountBill;
      const currency = await currencyService.getById(1);
      await billService.addAmountMoney(23, sender, currency);

      const transferToCreate = {
        accountBill: recipientAccountBill,
        amountMoney: 999999,
        transferTitle: "test2"
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/create")
        .set("Authorization", authToken)
        .send(transferToCreate);

      response.should.have.status(400);
    });

    it("should not able to return create new transaction when recipient is myself", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const currencyService = new CurrencyService();
      const sender = await userService.getByLogin(config.admin.login);
      const recipientBill = await billService.getByUser(sender);
      const recipientAccountBill = recipientBill.accountBill;
      const currency = await currencyService.getById(1);
      await billService.addAmountMoney(10, sender, currency);

      const transferToCreate = {
        accountBill: recipientAccountBill,
        amountMoney: 2,
        transferTitle: "test2"
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/create")
        .set("Authorization", authToken)
        .send(transferToCreate);

      response.should.have.status(400);
    });

    it("should not able to return create new transaction when amount money is less or equal to 0", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const currencyService = new CurrencyService();
      const sender = await userService.getByLogin(config.admin.login);
      const recipientBill = await billService.getByUser(sender);
      const recipientAccountBill = recipientBill.accountBill;
      const currency = await currencyService.getById(1);
      await billService.addAmountMoney(10, sender, currency);

      const transferToCreate = {
        accountBill: recipientAccountBill,
        amountMoney: 0,
        transferTitle: "test2"
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/create")
        .set("Authorization", authToken)
        .send(transferToCreate);

      response.should.have.status(400);
    });
  });

  describe("POST /api/transactions/confirm", () => {
    it("should be able to return confirm new transaction", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const transactionService = new TransactionService();
      const sender = await userService.getByLogin(config.admin.login);
      const recipient = await userService.getById(2);
      const recipientBill = await billService.getByUser(recipient);
      const recipientAccountBill = recipientBill.accountBill;
      const authorizationKey = await transactionService.getAuthorizationKey(
        sender,
        recipient
      );

      const transferToConfirm = {
        accountBill: recipientAccountBill,
        amountMoney: 10.2,
        transferTitle: "test",
        authorizationKey
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/confirm")
        .set("Authorization", authToken)
        .send(transferToConfirm);

      response.should.have.status(200);
    });

    it("should not able to return confirm transaction without token", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const transactionService = new TransactionService();
      const sender = await userService.getByLogin(config.admin.login);
      const recipient = await userService.getById(2);
      const recipientBill = await billService.getByUser(recipient);
      const recipientAccountBill = recipientBill.accountBill;
      const authorizationKey = await transactionService.getAuthorizationKey(
        sender,
        recipient
      );

      const transferToConfirm = {
        accountBill: recipientAccountBill,
        amountMoney: 10.2,
        transferTitle: "test",
        authorizationKey
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/confirm")
        .set("Authorization", authToken)
        .send(transferToConfirm);

      response.should.have.status(400);
    });

    it("should not able to return confirm transaction when authorizationKey has been incorrect", async () => {
      const billService = new BillService();
      const userService = new UserService();
      const recipient = await userService.getById(2);
      const recipientBill = await billService.getByUser(recipient);
      const recipientAccountBill = recipientBill.accountBill;

      const transferToConfirm = {
        accountBill: recipientAccountBill,
        amountMoney: 10.2,
        transferTitle: "test",
        authorizationKey: "ELO30"
      };

      const response = await chai
        .request(app)
        .post("/api/transactions/confirm")
        .set("Authorization", authToken)
        .send(transferToConfirm);

      response.should.have.status(400);
    });
  });
});
