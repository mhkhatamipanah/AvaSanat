"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
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
var Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
module.exports = Category;