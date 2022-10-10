import mongoose from "mongoose";


import bcrypt from "bcryptjs";

import crypto from "crypto";

import axios from "axios";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
});

// Encrpt the password ad Presave it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //  only run if password is modified
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12); // hashing password
 
  next();
});

// comparing password
userSchema.methods.correctPassword = async function (
  candidate_Password,
  user_Password
) {
  console.log(candidate_Password);
  return await bcrypt.compare(candidate_Password, user_Password);
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel

