const Sequelize = require('sequelize');
const db = {
  sequelize: new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  }),
  Sequelize: Sequelize
};

db.start = () => {
  return db.sequelize
  .authenticate()
  .catch(err => {
    throw err;
  });
}

db.reset = () => {
  return db.sequelize.dropAllSchemas();
}

db.sync = () => {
  return db.sequelize.sync({ force: true })
}
module.exports = db;