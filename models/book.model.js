const db = require(__dirname + '/../config/db');
const validator = require('validator');

const Model = db.Sequelize.Model;
class Book extends Model {}
Book.init({
  // attributes
  title: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: db.Sequelize.STRING,
    allowNull: true
  },
  ISBN: {
    type: db.Sequelize.STRING,
    unique: true,
    validate: {
      len: {
        args: [[10,17]],
        msg: "ISBN length is invalid"
      }
    }
  }
}, {
  sequelize: db.sequelize,
  modelName: 'book'
});

module.exports = Book;