const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  PC: String,
  CPU: String,
  GPU: String,
  RAM: String,
  Storage: String,
  SMPS: String,
  Cabinet: String,
  Price_INR: String
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const Profile = mongoose.model("gpccs", profileSchema);

module.exports = Profile;
module.exports = User;