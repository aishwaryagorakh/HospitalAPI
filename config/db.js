import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/HospitalAPI");
    console.log("MongoDB connected using mongoose");
  } catch (error) {
    console.log(error);
  }
};
