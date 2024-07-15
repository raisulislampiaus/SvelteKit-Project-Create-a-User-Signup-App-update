const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  emailOrMobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
  },
  gender: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
