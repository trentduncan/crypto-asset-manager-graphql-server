'use strict';

const mongoose = require('mongoose');

const CryptoUser = require('./models/cryptoUser');

const seedCryptoUsers = require('./db/seed/cryptoUsers');

mongoose.connect('mongodb://localhost/crypto-graphql')
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      CryptoUser.insertMany(seedCryptoUsers)
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });