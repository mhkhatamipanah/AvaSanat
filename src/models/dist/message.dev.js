"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var messageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  seen: {
    "default": 0,
    type: Number
  },
  answer: {
    "default": 0,
    type: Number
  }
}, {
  timestamps: true
});
var Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
module.exports = Message;