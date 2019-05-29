const Book = require('../../models/book.model')

module.exports = (req, res) => {
 const book = new Book(req.body);
 book.save()
   .then(book => {
     res.json(
      {
        status : "success",
        data : {
          "book" : book
        }
      })
    })
   .catch(err => {
     res.status(400).send("unable to save to database");
   });
}