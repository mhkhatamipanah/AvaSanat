"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var otpSchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  expTime: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
var OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
module.exports = OTP;