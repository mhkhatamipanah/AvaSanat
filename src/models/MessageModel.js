const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoIncrementFactory = require("mongoose-sequence");

const { MONGOOSE } = require("../utils/Frontend/ApiActions");

var connection = mongoose.createConnection(MONGOOSE);

const AutoIncrement = AutoIncrementFactory(connection);

const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
messageSchema.plugin(AutoIncrement, { inc_field: "id_Message" });

const MessageModel =
  mongoose.models.MessageModel || mongoose.model("MessageModel", messageSchema);
module.exports = MessageModel;
