'use strict';

const CryptoUser = require('../models/cryptoUser');

async function addCoin(_, {userId, id, symbol, amount, name}) {
  const newCoin = {id, symbol, amount, name};
  const updatedUser = await CryptoUser.findByIdAndUpdate({_id: userId}, { $push: { coins: newCoin }}, { new: true});
  return updatedUser;
}

// grab user push new object to collection

module.exports = {
    addCoin
}