const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrementFactory = require("mongoose-sequence");

const { MONGOOSE } = require("../utils/Frontend/ApiActions");

var connection = mongoose.createConnection(MONGOOSE);

const AutoIncrement = AutoIncrementFactory(connection);

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },
    file: {
      type: Buffer,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
BlogSchema.plugin(AutoIncrement, { inc_field: "id_Blog" });
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
module.exports = Blog;
