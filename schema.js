'use strict';

const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
//   type User {
//     id: ID
//     firstName: String!
//     lastName: String!
//     posts: [Post]
//   }

//   type Post {
//     id: ID
//     title: String
//     content: String
//     author: User
//   }
// `);
const schema = buildSchema(`
  type Query {
    hello: String
    getUser(username: String): User
    getTop10(sort: String): [Ticker]
    getUserCoins(id: ID): [Ticker]
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
`);

module.exports = schema;