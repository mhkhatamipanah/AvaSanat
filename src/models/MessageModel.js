const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  { timestamps: true }
);
const MessageModel =
  mongoose.models.MessageModel || mongoose.model("MessageModel", messageSchema);
module.exports = MessageModel;
