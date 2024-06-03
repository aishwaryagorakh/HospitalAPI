import mongoose from "mongoose";
import moment from "moment-timezone";

// Report Schema
const reportSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    required: true,
  },
  date: { type: Date, default: () => moment.tz("Asia/Kolkata").toDate() },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
