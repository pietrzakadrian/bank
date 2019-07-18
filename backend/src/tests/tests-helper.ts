import { Application } from "../app";
import express from "express";
import chai from "chai";
import chaiHttp = require("chai-http");
import { before } from "mocha";
import "mocha";

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
  console.info("## Starting tests...");
});
