const db = require('../config/db');
const Institution = require('../models/institution.model');
const validator = require('validator');

const Model = db.Sequelize.Model;

class User extends Model {}
User.init({
  // attributes
  firstName: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: true
  },
  role: {
    type: db.Sequelize.STRING,
    validate: {
      isIn: {
        args: [['student', 'academic', 'administrator']],
        msg: "Role: Must be one of these student, academic, administrator"
      }
    }
  },
  password: {
    type: db.Sequelize.STRING
    /* need to implement validation and security */
  }
}, {
  sequelize: db.sequelize,
  modelName: 'user'
});
User.hasMany(Institution);

module.exports = User;

