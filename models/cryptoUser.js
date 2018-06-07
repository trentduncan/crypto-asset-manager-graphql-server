'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const cryptoUserSchema = new mongoose.Schema({
  username: { type: String},
  password: {type: String},
  coins: { type: Array },
  timeStamp: { type: Number}
});

cryptoUserSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    // delete ret.password;
  }
});

cryptoUserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

cryptoUserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('cryptoUser', cryptoUserSchema);
