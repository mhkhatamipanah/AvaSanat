
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import Category from "@/src/models/Category";

const AutoIncrementFactory = require("mongoose-sequence");

const { MONGOOSE } = require("../utils/Frontend/ApiActions");

var connection = mongoose.createConnection(MONGOOSE);

const AutoIncrement = AutoIncrementFactory(connection);

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    descriptionSpecifications: {
      type: String,
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
    titleCategory:{
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
    
        index: {
          type: Number,
        },
      },
    ],
    feature: {
      type: Array, 
    },
    specifications: {
      type: Array, 
    },
  
    pdfFile: {
      type: Buffer,
      required: false, 
    },
    pdfFileName: {
      type: String,
      required: false, 
    },
  },
  
  { timestamps: true }
);


ProductSchema.plugin(AutoIncrement, { inc_field: "id_Product" });
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
module.exports = Product;
