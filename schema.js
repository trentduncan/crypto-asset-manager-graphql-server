'use strict';

const { makeExecutableSchema }= require('graphql-tools');
const {top10, userCoins, searchCoins} = require('./resolvers/queries');
const {addCoin} = require('./resolvers/mutations');

const typeDefs = `
    type Query {
      hello: String
      users(username: String): User
      top10(sort: Sort): [Ticker]
      userCoins: [Ticker]
      searchCoins(symbol: String): [Coin]
    }

    type Mutation {
      addCoin(id: Int, symbol: String, name: String, amount: Float ): User
    }
    
    enum Sort{
      rank
      percent_change_24h
    }

    type Ticker {
      id: Int
      name: String
      symbol: String
      price: Float
      change1h: Float
      change24h: Float
      change7d: Float
      amount: Float
    }

    type User {
      id: ID
      username: String!
      coins: [Coin]
    }

    type Coin {
      id: Int
      symbol: String
      name: String
      amount: Int
    }
`;


const resolvers = {
  Query : {
    hello: () => {
      return 'Hello world!';
    },
    top10,
    userCoins,
    searchCoins
  },
  Mutation : {
    addCoin
  }
};



const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});



module.exports = schema;