"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var contactUsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  file: {
    type: Buffer,
    required: true
  }
}, {
  timestamps: true
});
var contactUs = mongoose.models.contactUs || mongoose.model("contactUs", contactUsSchema);
module.exports = contactUs;