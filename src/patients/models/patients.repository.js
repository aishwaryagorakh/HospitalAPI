import mongoose from "mongoose";
import Patient from "./patients.schema.js";
import Doctor from "../../doctors/models/doctors.schema.js";

export default class PatientRepository {
  async register(name, phoneNumber) {
    return await Patient({
      patientName: name,
      phoneNumber: phoneNumber,
    }).save();
  }

  async createReportForPatient(patientId, doctorId, status) {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return "no Patient is available with this Id";
    } else {
      const newReport = {
        doctorId: new mongoose.Types.ObjectId(doctorId),
        patientId: new mongoose.Types.ObjectId(patientId),
        status: status,
      };
      const savedReport = await Report(newReport).save();
      patient.report.push(savedReport._id);
      await patient.save();
    }
    // Populate the 'report' field
    return await patient.populate({
      path: "report",
      options: { sort: { date: "asc" } },
    });
  }
  async getAllReportsForPatient(patientId) {
    const patient = await Patient.findById(patientId).populate("report");
    return patient;
  }

  async statusOfAllPatient(status) {
    const reports = await Report.find({ status }).populate("patientId");
    return reports;
  }
}
