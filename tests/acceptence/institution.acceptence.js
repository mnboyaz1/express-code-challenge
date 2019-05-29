const expect = require("chai").expect;
const Application = require('../../application')
const chance = require("chance").Chance();
const db = require('../../config/db')



describe("Institution (Acceptance)", () => {
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

  describe("Institution Create", async () => {
    let newInst;
    it("creates a new institution", async () => {
      try {
        newInst = await app.models.institution.create({
          name: "Test",
          emailDomain: "firstSchool.com",
          url: "https://firstSchool.com/home"
        });
        expect(newInst.id).to.be.greaterThan(0);
      } catch(e) {
        expect(e.message).to.not.exist;
      }   
    });

    it("updates a new user", async () => {
      try {
        newInst.url = "https://firstSchool.com/signUp";
        await newInst.save();
        expect(newInst.url).to.equal("https://firstSchool.com/signUp");
      } catch(e) {
        expect(e.message).to.not.exist;
      }   
    });


  });

  describe("Institution Reject Create", async () => {
    it("rejects a new instituion invalid emailDomain", async () => {
      try {
        const newInst = await app.models.institution.create({
          name: "Test",
          emailDomain: null,
          url: "https://firstSchool.com/home"
        });
        newInst.save();
      } catch(e) {
        /* Test will pass a rejection of emailDomain null */
        expect(e.message).to.include('institution.emailDomain cannot be null');
      }
    });

    it("rejects a new institution invalid url", async () => {
      try {
        const newInst = await app.models.institution.create({
          name: "Test",
          emailDomain: "firstSchool.com",
          url: 3333
        });
        newInst.save();
      } catch(e) {
        /* Test will pass a rejection of url invalid */
        expect(e.message).to.include('Institution URL is Invalid.');
      }
    });
  });
});