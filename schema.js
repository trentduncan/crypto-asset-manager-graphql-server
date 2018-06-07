'use strict';

const { makeExecutableSchema }= require('graphql-tools');
const {top10, userCoins} = require('./resolvers/queries');

const typeDefs = `
    type Query {
    hello: String
    users(username: String): User
    top10(sort: String): [Ticker]
    userCoins(id: ID): [Ticker]
    searchCoins(Symbol: String): [Coin]
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
    price: Float
    }
`;

const resolvers = {
  Query : {
    hello: () => {
      return 'Hello world!';
    },
    top10,
    userCoins
  }
};



const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});



module.exports = schema;