'use strict';

async function getTop10({sort}) {
  const top10 = await fetch(`https://api.coinmarketcap.com/v2/ticker/?limit=10&sort=${sort}`);
  return top10;
}

module.exports = {
    getTop10
}