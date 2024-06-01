const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Add unique constraint
  name: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  role: { type: String, enum: ["admin", "recruiter", "user"], default: "user" }, // Add role field
  verified: { type: Boolean, default: false }, // Add verified field
});

module.exports = mongoose.model("User", userSchema);
