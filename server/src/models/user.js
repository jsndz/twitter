import mongoose from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/config.js";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const encryptedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = encryptedPassword;
  next();
});

userSchema.methods.comparePasswords = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJwt = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};
const User = mongoose.model("User", userSchema);

export default User;
