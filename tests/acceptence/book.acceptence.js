const expect = require("chai").expect;
const Application = require('../../application')
const chance = require("chance").Chance();
const db = require('../../config/db')



describe("Book (Acceptance)", () => {
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

  describe("Book Create", async () => {
    let book;
    it("creates a new book", async () => {
      try {
        book = await app.models.book.create({
          title: "Test",
          author: "test author",
          ISBN: "978-3-16-148410-0"
        });
        expect(book.id).to.be.greaterThan(0);
      } catch(e) {
        expect(e.message).to.not.exist;
      }   
    });

    it("updates a new book", async () => {
      try {
        book.title = "Updated Title";
        await book.save();
        expect(book.title).to.equal("Updated Title");
      } catch(e) {
        expect(e.message).to.not.exist;
      }   
    });
  });

  describe("Book Reject Create", async () => {
    it("rejects a new book invalid title", async () => {
      try {
        const newBook = await app.models.book.create({
          title: null,
          author: "test author",
          ISBN: "978-3-16-148410-0"
        });
        newBook.save();
      } catch(e) {
        /* Test will pass a rejection of emailDomain null */
        expect(e.message).to.include('book.title cannot be null');
      }
    });

    it("rejects a new institution invalid ISBN", async () => {
      try {
        const newBook = await app.models.book.create({
          title: "test",
          author: "test author",
          ISBN: "13"
        });
        newBook.save();
      } catch(e) {
        console.log(e.message);
        /* Test will pass a rejection of url invalid */
        expect(e.message).to.include('ISBN length is invalid');
      }
    });
  });
});