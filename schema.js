'use strict';

const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
  type User {
    id: ID
    firstName: String!
    lastName: String!
    posts: [Post]
  }

  type Post {
    id: ID
    title: String
    content: String
    author: User
  }
`);

module.exports = schema;