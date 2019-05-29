const request = require('superagent');
const expect = require("chai").expect;
const Application = require('../../application');
const db = require('../../config/db');

describe("User (Integration)", () => {
  let app;

  before("setupApplication", async () => {
    app = new Application();
    await app.start();
    await db.reset();
    await db.sync();
  });

  after(async () => {
    await app.stop();
  });

  describe("User Integration Create", async () => {
    it("creates a new user", async () => {
        const newUser = {
          firstName: "Test",
          lastName: "User1",
          email: "testuser1@firstSchool.com",
          role: "student",
          password: "testing123"
        };
        const res = await request
        .post('localhost:3000/users/create')
        .send(newUser);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.id).to.be.greaterThan(0);
    });

    it("signs in a user", async () => {
        const user = {
          email: "testuser1@firstSchool.com",
          password: "testing123"
        };
        const res = await request
        .post('localhost:3000/users/signin')
        .send({email:user.email,password:user.password});
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user.email).to.equal(user.email);
    });
    
  })
});