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

async function userCoins(_, {id}) {
  const user = await CryptoUser.findOne({_id: id});
  const result = [];
  for (const item of user.coins) {
    let res = await fetch(`https://api.coinmarketcap.com/v2/ticker/${item.id}/`);
    const json = await res.json();
    let convertedCoinData = convertSingleObj(json);
    result.push(convertedCoinData);
  }
  return result;
}

async function searchCoins(_, {symbol, id}) {
  const currentUser = await CryptoUser.findOne({id});
  const {timeStamp} = currentUser;
//   if (!timeStamp) {
    const coinData = await fetch('https://api.coinmarketcap.com/v2/listings/');
    const json = coinData.json();
    const result = await CachedData.insertMany(json);
    console.log(result);
    return result;
//   }

}


module.exports = {
    top10,
    userCoins,
    searchCoins
}