import Doctor from "./doctors.schema.js";

export default class DoctorRepository {
  async registerDoctor(body) {
    return await Doctor(body).save();
  }

  async findDoctorByUSername(username) {
    return await Doctor.findOne({ username });
  }
}
