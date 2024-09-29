const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrementFactory = require("mongoose-sequence");

const { MONGOOSE } = require("../utils/Frontend/ApiActions");

var connection = mongoose.createConnection(MONGOOSE);

const AutoIncrement = AutoIncrementFactory(connection);

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    file: {
      type: Buffer,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
CategorySchema.plugin(AutoIncrement, { inc_field: "id_Category" });
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
module.exports = Category;
