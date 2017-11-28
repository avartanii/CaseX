process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Victim = require('../models/victim.js');
const User = require('../models/user.js');
const Suspect = require('../models/suspect.js');
const Case = require('../models/case.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);


describe('Victims', () => {
  beforeEach((done) => {
    // Clear the database
    Promise.all([Victim.remove({}, () => {}), Suspect.remove({}, () => {}),
      User.remove({}, () => {}), Case.remove({}, () => {})])
      .then(() => {
        done();
      });
  });

  describe('/GET victims', () => {
    let token;
    before((done) => {
      const data = {
        name: {
          first: 'Admin',
          middle: 'Admin',
          last: 'Admin'
        },
        employeeID: 123,
        permissionLevel: 'Admin',
        email: 'admin@gmail.com',
        password: 'foo'
      };
      chai.request(server)
        .post('/users')
        .send(data)
        .end((err, res) => {
          chai.request(server)
            .post('/authenticate')
            .send(data)
            .end((error, auth) => {
              token = auth.body.token;
              done();
            });
        });
    });

    it('it should GET all the victims', (done) => {
      chai.request(server)
        .get('/victims')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST victims', () => {
    let token;
    before((done) => {
      const data = {
        name: {
          first: 'Admin',
          middle: 'Admin',
          last: 'Admin'
        },
        employeeID: 123,
        permissionLevel: 'Admin',
        email: 'admin@gmail.com',
        password: 'foo'
      };
      chai.request(server)
        .post('/users')
        .send(data)
        .end((err, res) => {
          chai.request(server)
            .post('/authenticate')
            .send(data)
            .end((error, auth) => {
              token = auth.body.token;
              done();
            });
        });
    });
    it('it should POST a victim', (done) => {
      const victim = {
        victName: {
          first: 'John',
          middle: 'Victim',
          last: 'Doe'
        },
        victSex: 'Male',
        victDesc: 'Description',
        victAge: 30
      };
      chai.request(server)
        .post('/victims')
        .set('x-access-token', token)
        .send(victim)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.not.have.property('errors');
          res.body.should.have.property('victSex').eql('Male');
          res.body.should.have.property('victDesc').eql('Description');
          res.body.should.have.property('victAge').eql(30);
          res.body.should.have.property('victName');
          done();
        });
    });
    it('it should not POST a victim without a name', (done) => {
      const victim = {
        victName: {
          middle: 'Victim',
          last: 'Doe'
        },
        victSex: 'Male',
        victDesc: 'Description',
        victAge: 30
      };
      chai.request(server)
        .post('/victims')
        .set('x-access-token', token)
        .send(victim)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors['victName.first'].should.have.property('kind').eql('required');
          done();
        });
    });
  });
});
