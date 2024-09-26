const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
module.exports = OTP;
