"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AutoIncrementFactory = require("mongoose-sequence");

var _require = require("../utils/Frontend/ApiActions"),
    MONGOOSE = _require.MONGOOSE;

var connection = mongoose.createConnection(MONGOOSE);
var AutoIncrement = AutoIncrementFactory(connection);
var BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  file: {
    type: Buffer,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
BlogSchema.plugin(AutoIncrement, {
  inc_field: "id_Blog"
});
var Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
module.exports = Blog;