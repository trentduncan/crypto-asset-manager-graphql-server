'use strict';

const fetch = require('node-fetch');

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
    obj.change1d = incObj.data[key].quotes.USD.percent_change_7d;
    result.push(obj);
  }
  return result
}

async function getTop10({sort}) {
  const res = await fetch(`https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=${sort}`);
  const json = await res.json();
  const result = convertTop10Data(json);
  return result;
}

async function getUserCoins({id}) {
  
}

module.exports = {
    getTop10,
    getUserCoins
}