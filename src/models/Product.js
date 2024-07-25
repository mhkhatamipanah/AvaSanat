// import time_date from "@/utils/time-date";
// import User from "@/models/user";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import Category from "@/src/models/Category";

// const AutoIncrementFactory = require("mongoose-sequence");

// var connection = mongoose.createConnection(process.env.MONGOOSE);

// const AutoIncrement = AutoIncrementFactory(connection);

// const timeAndDate = time_date();

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
// documentSaleSquad.plugin(AutoIncrement, { inc_field: "id_document_sale_squad" });

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;
