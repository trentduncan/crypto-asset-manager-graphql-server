'use strict';

const mongoose = require('mongoose');

const User = require('./models/user');

const seedUsers = require('./db/seed/users');

mongoose.connect('mongodb://localhost/blog-app-graphql')
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      User.insertMany(seedUsers)
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });