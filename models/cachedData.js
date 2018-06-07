'use strict';

const mongoose = require('mongoose');

const cachedDataSchema = new mongoose.Schema({
  symbol: {type: String},
  name: {type: String},
  amount: {type: Number},
  coinId: {type: Number}
});

cachedDataSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    // delete ret.password;
  }
});


module.exports = mongoose.model('cachedData', cachedDataSchema);
