const request = require('superagent');
const expect = require("chai").expect;
const Application = require('../../application');
const db = require('../../config/db');

describe("Book (Integration)", () => {
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

  describe("Book Integration Create", async () => {
    it("creates a new book", async () => {
      const newBook = {
        title: "Test",
        author: "test author",
        ISBN: "978-3-16-148410-0"
      };
      const res = await request
      .post('localhost:3000/books/create')
      .send(newBook);
      expect(res.body.status).to.equal('success');
      expect(res.body.data.book.id).to.be.greaterThan(0);
    }); 
  })
});