const request = require('superagent');
const expect = require("chai").expect;
const Application = require('../../application');
const db = require('../../config/db');

describe("Institution (Integration)", () => {
  let app;

  before("setupApplication", async () => {
    app = new Application();
    await app.start();
  });

  beforeEach(async () => {
    await db.reset();
    await db.sync();
  });

  after(async () => {
    await app.stop();
  });

  describe("Institution Integration Create", async () => {
    it("creates a new institution", async () => {
        const newInst = {
          name: "Test",
          emailDomain: "firstSchool.com",
          url: "https://firstSchool.com/home"
        };
        const res = await request
        .post('localhost:3000/institutions/create')
        .send(newInst);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.institution.id).to.be.greaterThan(0);
    }); 
  })
});