import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose.connect(process.env.MONGOOSE);
    console.log("Connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
