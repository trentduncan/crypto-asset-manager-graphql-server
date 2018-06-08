'use strict';

const { makeExecutableSchema }= require('graphql-tools');
const {top10, userCoins, searchCoins} = require('./resolvers/queries');
const {addCoin} = require('./resolvers/mutations');

const typeDefs = `
    type Query {
      hello: String
      users(username: String): User
      top10(sort: String): [Ticker]
      userCoins(id: ID): [Ticker]
      searchCoins(symbol: String, id: ID): [Coin]
    }

    type Mutation {
      addCoin(userId : ID, id: Int, symbol: String, name: String, amount: Float ): Coin
    }

    type Ticker {
      id: ID
      name: String
      symbol: String
      price: Float
      change1h: Float
      change24h: Float
      change7d: Float
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