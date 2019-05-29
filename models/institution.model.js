const db = require('../config/db');
const validator = require('validator');
const Book = require(__dirname + '/book.model');

const Model = db.Sequelize.Model;
class Institution extends Model {}
Institution.init({
  // attributes
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  emailDomain: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  url: {
    type: db.Sequelize.STRING,
    validate: {
      isUrl: {
        msg: "Institution URL is Invalid."
      }
    },
    unique: true
  }
}, {
  sequelize: db.sequelize,
  modelName: 'institution'
});
Institution.hasMany(Book);

module.exports = Institution;