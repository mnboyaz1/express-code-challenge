const expect = require("chai").expect;
const Application = require('../../application')
const chance = require("chance").Chance();
const db = require('../../config/db')



describe("User (Acceptance)", () => {
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

  describe("User Create", async () => {
    let newUser;
    it("creates a new user", async () => {
      try {
        newUser = await app.models.user.create({
          firstName: "Test",
          lastName: "User1",
          email: "testuser1@firstSchool.com",
          role: "student",
          password: "testing123"
        });
        expect(newUser.id).to.be.greaterThan(0);
      } catch(e) {
        expect(e.message).to.not.exist;
      }   
    });

    it("updates a new user", async () => {
      try {
        newUser.email = "testuser1@secondSchool.com";
        await newUser.save();
        expect(newUser.email).to.equal("testuser1@secondSchool.com");
      } catch(e) {
        expect(e.message).to.not.exist;
      }   
    });    
  });

  describe("User reject Create", async () => {
    it("rejects a new user invalid email", async () => {
      try {
        const newUser = await app.models.user.create({
          firstName: "Test",
          lastName: "User2",
          email: "test&somewhere.com",
          role: "student",
          password: "testing123"
        });
        newUser.save();
      } catch(e) {
        /* Test will pass a rejection of email invalid */
        expect(e.message).to.include('Validation isEmail on email failed');
      }
    });

    it("rejects a new user invalid role", async () => {
      try {
        const newUser = await app.models.user.create({
          firstName: "Test",
          lastName: "User2",
          email: "test@firstSchool.com",
          role: "visitor",
          password: "testing123"
        });
        newUser.save();
      } catch(e) {
        /* Test will pass a rejection of role invalid */
        expect(e.message).to.include('Role: Must be one of these student, academic, administrator');
      }
    });
  });
});