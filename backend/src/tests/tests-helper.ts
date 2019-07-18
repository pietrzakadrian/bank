import { Application } from "../app";
import express from "express";
import chai from "chai";
import chaiHttp = require("chai-http");
import { before } from "mocha";
import "mocha";
import config from "../config/config";

chai.use(chaiHttp);
const should = chai.should();

let application: Application; // instance of our Application class
export let app: express.Application; // express app
export let authToken: string;
export let testUserId: string;

before(async () => {
  application = await new Application();
  await application.setupDbAndServer();
  app = application.app;

  console.log("## Authenticating to get token...");
  let response = await chai
    .request(app)
    .post("/api/auth/login")
    .send({ login: config.admin.login, password: `${config.admin.password}` });
  authToken = "Bearer " + response.body.token;

  console.info("## Starting tests...");
});
