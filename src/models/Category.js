const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
module.exports = Category;
