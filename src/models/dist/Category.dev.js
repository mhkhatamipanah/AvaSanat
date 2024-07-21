"use strict";

// import time_date from "@/utils/time-date";
// import User from "@/models/user";
var mongoose = require("mongoose");

var Schema = mongoose.Schema; // const AutoIncrementFactory = require("mongoose-sequence");
// var connection = mongoose.createConnection(process.env.MONGOOSE);
// const AutoIncrement = AutoIncrementFactory(connection);
// const timeAndDate = time_date();

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
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  } // dir: {
  //   type: String,
  //   required: true,
  // },

}, {
  timestamps: true
}); // documentSaleSquad.plugin(AutoIncrement, { inc_field: "id_document_sale_squad" });

var Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
module.exports = Category;