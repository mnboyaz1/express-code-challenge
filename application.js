'use strict';
const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const LocalStrategy = require('passport-local').Strategy;

function Application() {
  var self = this;
  passport.use(new LocalStrategy(
    {usernameField:'email', passwordField:'password'},
    async function(email,password,done) {
      const found = await self.models.user.findOne({
        where: {
          email: email,
          password: password
        }
     });
     return (!found) 
      ? done(null,false)
      : done(null,found.dataValues);
  }));
  
  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(async function(id, done) {
    const found = await self.models.user.findOne({
      where: {
        id:id
      }
    });
    return (!found) 
      ? done(null,false)
      : done(null,found.dataValues);
  });
  
  this.app = express();
  this.app.use(bodyParser.json());
  this.app.use(passport.initialize());
  this.app.use(passport.session());
  this.start = async () => {
    await db.start();
    await db.sync(); // Only for Sqlite
    this.app.get('/', this.routes.index);
    this.app.post('/users/create', this.routes.createUser);
    this.app.post('/institutions/create', this.routes.createInstitution);
    this.app.post('/books/create', this.routes.createBook);
    this.app.post('/users/signin', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json(
            {
              status : "success",
              data : {
                "user" : req.user
              }
            }
          ) 
        });
      })(req, res, next);
    });
    return new Promise(resolve => {
      this.server = this.app.listen(3000, () => resolve(true))
    });
  };
  this.stop = () => {
    return new Promise(resolve => {
      this.server.close(() => resolve(true));
    });
  };
  this.models = {
    user : require('./models/user.model'),
    institution : require('./models/institution.model'),
    book : require('./models/book.model')
  };
  
  this.routes = {
    index : require('./routes/index.js'),
    createUser: require('./routes/users/create.js'),
    createInstitution: require('./routes/institutions/create.js'),
    createBook: require('./routes/books/create.js')
  };
}
module.exports = Application;