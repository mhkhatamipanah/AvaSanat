"use strict";

var _Category = _interopRequireDefault(require("@/src/models/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
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
  routeProduct: {
    type: String,
    required: true
  },
  routeCategory: {
    type: String,
    required: true
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
});
var Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;