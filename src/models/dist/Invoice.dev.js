"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AutoIncrementFactory = require("mongoose-sequence");

var _require = require("../utils/Frontend/ApiActions"),
    MONGOOSE = _require.MONGOOSE;

var connection = mongoose.createConnection(MONGOOSE);
var AutoIncrement = AutoIncrementFactory(connection);
var InvoiceSchema = new Schema({
  invoice: {
    type: Array
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    "default": ""
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
InvoiceSchema.plugin(AutoIncrement, {
  inc_field: "id_Invoice"
});
var Invoice = mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;