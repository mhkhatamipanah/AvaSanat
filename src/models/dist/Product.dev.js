"use strict";

var _Category = _interopRequireDefault(require("@/src/models/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AutoIncrementFactory = require("mongoose-sequence");

var _require = require("../utils/Frontend/ApiActions"),
    MONGOOSE = _require.MONGOOSE;

var connection = mongoose.createConnection(MONGOOSE);
var AutoIncrement = AutoIncrementFactory(connection);
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
  }],
  feature: {
    type: Array
  },
  specifications: {
    type: Array
  }
}, {
  timestamps: true
});
ProductSchema.plugin(AutoIncrement, {
  inc_field: "id_Product"
});
var Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;