'use strict';

const express = require('express');
const mongoose = require('mongoose');
const schema = require('./schema');
const bodyParser = require('body-parser');
const { graphqlExpress }=  require('apollo-server-express');


const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

mongoose.connect('mongodb://localhost/crypto-graphql');
const db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose');});
db.once('open', () => {
  console.log( '+++Connected to mongoose');
});
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');