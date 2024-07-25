"use strict";

var _Category = _interopRequireDefault(require("@/src/models/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import time_date from "@/utils/time-date";
// import User from "@/models/user";
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
// const AutoIncrementFactory = require("mongoose-sequence");
// var connection = mongoose.createConnection(process.env.MONGOOSE);
// const AutoIncrement = AutoIncrementFactory(connection);
// const timeAndDate = time_date();
var ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category"
  },
  indexMainImage: {
    type: Number,
    required: true,
    "default": 0
  },
  file: [{
    thumbnail: {
      type: Buffer,
      required: true
    },
    mainImage: {
      type: Buffer,
      required: true
    },
    index: {
      type: Number
    }
  }]
}, {
  timestamps: true
}); // documentSaleSquad.plugin(AutoIncrement, { inc_field: "id_document_sale_squad" });

var Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;