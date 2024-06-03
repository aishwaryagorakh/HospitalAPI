import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Hashiing user password before saving using bcrypt
doctorSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// USer password compare
doctorSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
doctorSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expire,
  });
};

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
