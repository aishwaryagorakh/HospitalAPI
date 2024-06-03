import mongoose from "mongoose";
import moment from "moment-timezone";

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },

  createdAt: { type: Date, default: () => moment.tz("Asia/Kolkata").toDate() },

  report: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
