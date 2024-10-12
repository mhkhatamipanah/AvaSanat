const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrementFactory = require("mongoose-sequence");

const { MONGOOSE } = require("../utils/Frontend/ApiActions");

var connection = mongoose.createConnection(MONGOOSE);

const AutoIncrement = AutoIncrementFactory(connection);

const InvoiceSchema = new Schema(
  {
    invoice: {
      type: Array,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",

    },
    seen: {
      default: 0,
      type: Number,
    },
    answer: {
      default: 0,
      type: Number,
    },
    text_answer: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);
InvoiceSchema.plugin(AutoIncrement, { inc_field: "id_Invoice" });
const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
