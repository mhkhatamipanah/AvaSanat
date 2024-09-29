"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AutoIncrementFactory = require("mongoose-sequence");

var _require = require("../utils/Frontend/ApiActions"),
    MONGOOSE = _require.MONGOOSE;

var connection = mongoose.createConnection(MONGOOSE);
var AutoIncrement = AutoIncrementFactory(connection);
var CategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  file: {
    type: Buffer,
    required: true
  },
  route: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
CategorySchema.plugin(AutoIncrement, {
  inc_field: "id_Category"
});
var Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
module.exports = Category;