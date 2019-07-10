import { Application } from '../app';
import express from 'express';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { before } from 'mocha';
import 'mocha';

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

  console.log('## Creating a test account...');
  let response = await chai.request(app).post('/api/utils/first_account');
  testUserId = response.body.user.id;
  console.log('## Authenticating to get token...');
  response = await chai.request(app).post('/api/login')
    .send({ email: 'test@v2x.network', password: '123456' });
  authToken = 'Bearer ' + response.body.token;
  console.info('## Starting tests...');
});
