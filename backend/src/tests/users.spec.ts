import 'mocha';

import chai from 'chai';
import chaiHttp = require('chai-http');

import { app, authToken, testUserId } from './tests-helper';
import errors from '../assets/i18n/en/errors';

chai.use(chaiHttp);
const should = chai.should();

const userToRegister = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@test.com',
  password: '123123123'
};

describe('Users', () => {

  describe('POST /signup', () => {

    describe('invalid body', () => {
      it('should not able to register a user without firstName in body', (done) => {
        const tmpUser = Object.assign({}, userToRegister);
        delete tmpUser.firstName;
        chai.request(app)
          .post('/api/signup')
          .send(tmpUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.equal(false);
            done();
          });
      });

      it('should not able to register a user without lastName in body', (done) => {
        const tmpUser = Object.assign({}, userToRegister);
        delete tmpUser.lastName;
        chai.request(app)
          .post('/api/signup')
          .send(tmpUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.equal(false);
            done();
          });
      });

      describe('email', () => {
        it('should not able to register a user without email in body', (done) => {
          const tmpUser = Object.assign({}, userToRegister);
          delete tmpUser.email;
          chai.request(app)
            .post('/api/signup')
            .send(tmpUser)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.success.should.equal(false);
              done();
            });
        });

        it('should not able to register a user if provided email is not a valid email', (done) => {
          const tmpUser = Object.assign({}, userToRegister);
          tmpUser.email = 'wrong-email';
          chai.request(app)
            .post('/api/signup')
            .send(tmpUser)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.success.should.equal(false);
              done();
            });
        });

        it('should not able to register a user if email is already used', (done) => {
          const tmpUser = Object.assign({}, userToRegister);
          tmpUser.email = 'test@v2x.network';
          chai.request(app)
            .post('/api/signup')
            .send(tmpUser)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.success.should.equal(false);
              done();
            });
        });
      });


      it('should not able to register a user without password in body', (done) => {
        const tmpUser = Object.assign({}, userToRegister);
        delete tmpUser.password;
        chai.request(app)
          .post('/api/signup')
          .send(tmpUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.equal(false);
            done();
          });
      });
    });


    it('should be able to register a user with correct details', (done) => {
      chai.request(app)
        .post('/api/signup')
        .send(userToRegister)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          done();
        });
    });
  });

  describe('POST /login', () => {

    it('should be able to login with correct credentials & get token', (done) => {
      chai.request(app)
        .post('/api/login')
        .send({ email: 'test@v2x.network', password: '123456' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true);
          res.body.should.have.property('token');
          done();
        });
    });

    it('should not able to login with correct email & wrong password', (done) => {
      chai.request(app)
        .post('/api/login')
        .send({ email: 'test@v2x.network', password: 'aaaaaa' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.trim().should.equal(errors.incorrectPassword);
          done();
        });
    });

    it('should not able to login with wrong email & correct password', (done) => {
      chai.request(app)
        .post('/api/login')
        .send({ email: 'wrong@v2x.network', password: '123456' })
        .end((err, res) => {
          res.should.have.status(400);  // bad request because of wrong email
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.trim().should.equal(errors.emailNotFound);
          done();
        });
    });

    it('should not able to login without a password in request body', (done) => {
      chai.request(app)
        .post('/api/login')
        .send({ email: 'test@v2x.network' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should not able to login without a email in request body', (done) => {
      chai.request(app)
        .post('/api/login')
        .send({ password: 'xxxx' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(false);
          done();
        });
    });

  });

  describe('GET /users', () => {

    it('should be able to get all users with valid auth token', (done) => {
      chai.request(app)
        .get('/api/users')
        .set('Authorization', authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          res.body.should.have.property('data');
          res.body.data.should.be.an('array');
          done();
        });
    });

    it('should not be able to get all users without valid auth token', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });

  });

  describe('GET /users/:id', () => {

    it('should be able to get specific users with correct user id, provided a valid auth token', (done) => {
      chai.request(app)
        .get('/api/users/' + testUserId)
        .set('Authorization', authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          res.body.should.have.property('user');
          done();
        });
    });

    it('should not be able to get specific users with correct user id, without auth token', (done) => {
      chai.request(app)
        .get('/api/users/' + testUserId)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should not be able to get a user witu incorrect user id', (done) => {
      chai.request(app)
        .get('/api/users/wrong-id')
        .set('Authorization', authToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          done();
        });
    });

  });

  describe('GET /users/profile', () => {

    it('should be able to get user profile of logged in user', (done) => {
      chai.request(app)
        .get('/api/users/profile')
        .set('Authorization', authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.success.should.equal(true);
          res.body.should.have.property('user');
          res.body.user.should.have.property('id');
          done();
        });
    });

    it('should not be able to get user profile without token', (done) => {
      chai.request(app)
        .get('/api/users/profile')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.equal(false);
          done();
        });
    });

  });

  describe('PUT /users/profile', () => {

    describe('Profile Update', () => {

      it('should be able to update user first name & last name of logged in user', (done) => {
        chai.request(app)
          .put('/api/users/profile')
          .send({ firstName: 'fName-Updated', lastName: 'lName-Updated' })
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.success.should.equal(true);
            res.body.should.have.property('user');
            res.body.user.firstName.should.equal('fName-Updated');
            res.body.user.lastName.should.equal('lName-Updated');
            done();
          });
      });

      it('should not be able to update user email if email is wrong', (done) => {
        chai.request(app)
          .put('/api/users/profile')
          .send({ email: 'wrong-email' })
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.equal(false);
            done();
          });
      });

      it('should not be able to update user email if new email belongs to other user', (done) => {
        chai.request(app)
          .put('/api/users/profile')
          .send({ email: 'john@test.com' })  // a user was created with this email as part of test in same file above
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.equal(false);
            done();
          });
      });

    });

    describe('Password change', () => {

      it('should not be able to update password if user provides correct old password but an invalid new password', (done) => {
        chai.request(app)
          .put('/api/users/profile')
          .send({ oldPassword: '123456', newPassword: 'xx' })
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.equal(false);
            done();
          });
      });

      it('should not be able to update password if user provides incorrect old password', (done) => {
        chai.request(app)
          .put('/api/users/profile')
          .send({ oldPassword: 'xxxxxx', newPassword: '654321' })
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.success.should.equal(false);
            done();
          });
      });

      it('should be able to update password if user provides correct old password and a new password', (done) => {
        chai.request(app)
          .put('/api/users/profile')
          .send({ oldPassword: '123456', newPassword: '654321' })
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.success.should.equal(true);
            done();
          });
      });

      it('should not be able to login with old password after password is changed', (done) => {
        chai.request(app)
          .post('/api/login')
          .send({ email: 'test@v2x.network', password: '123456' })
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.success.should.equal(false);
            res.body.message.trim().should.equal(errors.incorrectPassword);
            done();
          });
      });

      it('should be able to login with new password after password is changed', (done) => {
        chai.request(app)
          .post('/api/login')
          .send({ email: 'test@v2x.network', password: '654321' })
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.success.should.equal(true);
            res.body.should.have.property('token');
            done();
          });
      });

    });

  });

});
