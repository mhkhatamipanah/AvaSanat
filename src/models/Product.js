
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import Category from "@/src/models/Category";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    routeCategory:{
      type: String,
      required: true,
    },
    indexMainImage: {
      type: Number,
      required: true,
      default: 0,
    },
    file: [
      {
        thumbnail: {
          type: Buffer,
          required: true,
        },
        mainImage: {
          type: Buffer,
          required: true,
        },
        index: {
          type: Number,
        },
      },
    ],
  },
  
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;
