'use strict';

const CryptoUser = require('../models/cryptoUser');

async function addCoin(_, { id, symbol, amount, name}) {
  const newCoin = {id, symbol, amount, name};
  const updatedUser = await CryptoUser.findByIdAndUpdate({_id: "5b1a91ee42389646cdd90051"}, { $push: { coins: newCoin }}, { new: true});
  return updatedUser;
}


module.exports = {
    addCoin
}