'use strict';

const fetch = require('node-fetch');
const CryptoUser = require('../models/cryptoUser');
const CachedData = require('../models/cachedData');

function convertTop10Data(incObj) {
  const result = [];
  for (let key in incObj.data) {
    let obj = {};
    obj.id = incObj.data[key].id;
    obj.name = incObj.data[key].name;
    obj.symbol = incObj.data[key].symbol;
    obj.price = incObj.data[key].quotes.USD.price;
    obj.change1h = incObj.data[key].quotes.USD.percent_change_1h;
    obj.change24h = incObj.data[key].quotes.USD.percent_change_24h;
    obj.change7d = incObj.data[key].quotes.USD.percent_change_7d;
    result.push(obj);
  }
  return result
}


function convertSingleObj(incObj) {
    let obj = {};
    obj.id = incObj.data.id;
    obj.name = incObj.data.name;
    obj.symbol = incObj.data.symbol;
    obj.price = incObj.data.quotes.USD.price;
    obj.change1h = incObj.data.quotes.USD.percent_change_1h;
    obj.change24h = incObj.data.quotes.USD.percent_change_24h;
    obj.change7d = incObj.data.quotes.USD.percent_change_7d;
    return obj
}

async function top10(_, {sort}) {
  const res = await fetch(`https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=${sort}`);
  const json = await res.json();
  const result = convertTop10Data(json);
  return result;
}

async function userCoins() {
  const user = await CryptoUser.findOne({_id: "5b1a91ee42389646cdd90051"});
  const result = [];
  for (const item of user.coins) {
    let res = await fetch(`https://api.coinmarketcap.com/v2/ticker/${item.id}/`);
    const json = await res.json();
    let convertedCoinData = convertSingleObj(json);
    result.push(convertedCoinData);
  }
  return result;
}

async function searchCoins(_, {symbol}) {
  const currentUser = await CryptoUser.findOne({_id: "5b1a91ee42389646cdd90051"});
  const {timeStamp} = currentUser;
  const currentTime = Date.now()/1000;
  console.log(timeStamp, currentTime);
  if (!timeStamp || currentTime - timeStamp > 600) {
    await CachedData.remove({});
    const coinData = await fetch('https://api.coinmarketcap.com/v2/listings/');
    const json = await coinData.json();
    console.log('hit');
    const result = await CachedData.insertMany(json.data);
    await CryptoUser.findByIdAndUpdate({_id: "5b1a91ee42389646cdd90051"}, {$set: {timeStamp: currentTime}})
  }
  symbol = symbol.toUpperCase();
  let searchData = await CachedData.find({symbol});
  if (searchData.length === 0) {
    const re = new RegExp(symbol, 'i');
    searchData = await CachedData.find({symbol: { $regex: re }}); 
  }
  return searchData;
}
// use redis to store timestamp



module.exports = {
    top10,
    userCoins,
    searchCoins
}