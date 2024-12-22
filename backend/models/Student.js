const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  faculty: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);
