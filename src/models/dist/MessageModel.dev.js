"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AutoIncrementFactory = require("mongoose-sequence");

var _require = require("../utils/Frontend/ApiActions"),
    MONGOOSE = _require.MONGOOSE;

var connection = mongoose.createConnection(MONGOOSE);
var AutoIncrement = AutoIncrementFactory(connection);
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
  },
  text_answer: {
    type: String,
    "default": ""
  }
}, {
  timestamps: true
});
messageSchema.plugin(AutoIncrement, {
  inc_field: "id_Message"
});
var MessageModel = mongoose.models.MessageModel || mongoose.model("MessageModel", messageSchema);
module.exports = MessageModel;