const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  PC: String,
  CPU: String,
  GPU: String,
  RAM: String,
  Storage: String,
  SMPS: String,
  Cabinet: String,
  Price_INR: String,
  Creator: String,
});

const Profile = mongoose.model("gpccs", profileSchema);

module.exports = Profile;


